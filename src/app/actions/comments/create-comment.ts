"use server";

import { prisma } from "@/prisma/prisma-client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { CommentDTO } from "@/types/types";

export interface CreateCommentProps {
  content: string;
  postId: string;
}

export async function createComment(data: CreateCommentProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("unauthorized");
  }

  const newComment = await prisma.comment.create({
    data: {
      content: data.content,
      authorId: session.user.id,
      postId: data.postId
    },

    include: {
      author: {
        select: {
          username: true,
          imageUrl: true
        }
      }
    }
  });

  return newComment
}
