"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/prisma-client";

export const deleteChat = async (chatId: string) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("unauthorized");
  }

  const chat = await prisma.chat.findFirst({
    where: {
      id: chatId,
      members: { some: { userId: session.user.id } },
    },
  });

  if (!chat) {
    throw new Error("chat not found or no access");
  }

  // при удалении личного чата стираем сообщения
  if (chat.type === "PRIVATE") {
    await prisma.message.deleteMany({
      where: {
        chatId,
      },
    });
  }

  await prisma.chat.delete({
    where: {
      id: chatId,
    },
  });
};
