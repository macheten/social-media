import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

const ITEMS_PER_PAGE = 10;
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const cursor = searchParams.get("cursor");

    if (!userId) {
      return NextResponse.json(
        { message: "Неправильный запрос. Укажите userId" },
        { status: 400 }
      );
    }

    let posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },

      // запрос на 1 страницу больше чем надо для того чтобы узнать, есть ли след. страница
      take: ITEMS_PER_PAGE + 1,
      cursor: cursor ? { id: cursor } : undefined,

      orderBy: {
        createdAt: "desc",
      },
    });

    // если вернулось постов больше чем ITEMS_PER_PAGE, то след. страница есть
    // в другом случае нету
    const hasNextPage = posts.length > ITEMS_PER_PAGE;

    // если есть след. страница, то следующим курсором будет id последнего поста
    // эта строка должна быть до posts.slice()
    const endCursor = hasNextPage ? posts[posts.length - 1].id : null;

    // если есть след. страница, срезаем последний лишний элемент
    // если нету след. страницы, то возвращаем просто posts
    posts = hasNextPage ? posts.slice(0, -1) : posts;

    return NextResponse.json({
      posts,
      hasNextPage,
      endCursor,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Что-то пошло не так" },
      { status: 500 }
    );
  }
}
