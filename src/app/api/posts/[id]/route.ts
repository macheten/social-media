import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(req: NextRequest, { params }: Params) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: "Укажите id" }, { status: 400 });
  }

  const post = await prisma.post.findFirst({
    where: {
      id,
    },

    include: {
      author: {
        select: {
          username: true,
          imageUrl: true,
        },
      },

      _count: {
        select: {
            comments: true
        }
      }
    },
  });

  if (!post) {
    return NextResponse.json({ post: null, message: "Пост не найден" });
  }

  const { _count, ...postRes } = post

  return NextResponse.json({ post: {...postRes, commentsCount: post._count.comments} });
}
