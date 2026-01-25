"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/prisma-client";
import { PostDTO } from "@/types/types";

export interface CreatePostProps {
  title: string;
  content: string;
}

interface ReturnType {
  success: boolean;
  newPost?: PostDTO;
}

export async function createPost({
  content,
  title,
}: CreatePostProps): Promise<ReturnType> {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("unauthorized");
  }

  const newPost = await prisma.post.create({
    data: {
      content,
      title,
      authorId: session.user.id,
    },

    include: {
      author: {
        select: {
          username: true
        }
      }
    }
  });

  return {
    success: true,
    newPost,
  };
}
