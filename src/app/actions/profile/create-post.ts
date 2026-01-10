"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/prisma-client";

export interface CreatePostProps {
  title: string;
  content: string;
}

interface ReturnType {
  success: boolean;
}

export async function CreatePost({
  content,
  title,
}: CreatePostProps): Promise<ReturnType> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      success: false,
    };
  }

  await prisma.post.create({
    data: {
      content,
      title,
      authorId: session.user.id,
    },
  });

  return {
    success: true
  }
}
