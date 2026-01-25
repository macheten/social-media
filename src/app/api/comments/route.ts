import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

const COMMENTS_PER_PAGE = 10;

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const postId = searchParams.get('postId')
  const cursor = searchParams.get('cursor')

  if (!postId) {
    return NextResponse.json(
      { message: "postId must not be null" },
      { status: 400 }
    );
  }

  let comments = await prisma.comment.findMany({
    where: {
      postId,
    },

    take: COMMENTS_PER_PAGE + 1,
    cursor: cursor ? { id: cursor } : undefined,

    include: {
      author: {
        select: {
          username: true,
          imageUrl: true
        }
      }
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  let hasNextPage = comments.length > COMMENTS_PER_PAGE;
  let nextCursor = hasNextPage ? comments[comments.length - 1].id : null;
  comments = hasNextPage ? comments.slice(0, -1) : comments;

  return NextResponse.json({
    comments,
    hasNextPage,
    nextCursor,
  });
}
