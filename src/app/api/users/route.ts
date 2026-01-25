import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

const USERS_PER_PAGE = 10;

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const cursor = searchParams.get("cursor");
    const nameQuery = searchParams.get("username");

    let users = await prisma.user.findMany({
      where: {
        activated: true, // чтобы убрать пользователей которые не подтвердили почту
        username: {
          contains: nameQuery || '',
          mode: 'insensitive' // поиск по имени не чувствителен к регистру
        }
      },

      cursor: cursor ? { id: cursor } : undefined,
      take: USERS_PER_PAGE + 1,

      select: {
        id: true,
        username: true,
        imageUrl: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    const hasNextPage = users.length > USERS_PER_PAGE;
    const nextCursor = hasNextPage ? users[users.length - 1].id : null;
    users = hasNextPage ? users.slice(0, -1) : users;

    return NextResponse.json({
      users,
      hasNextPage,
      nextCursor,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
