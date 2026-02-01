"use server";

import { prisma } from "@/prisma/prisma-client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { ChatType, Prisma } from "@prisma/client";

export interface CreateChatProps {
  type: ChatType;
  membersIds: string[];
}

export const createChat = async ({
  membersIds,
  type,
}: CreateChatProps) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("unauthorized");
  }

  if (type === 'PRIVATE' && membersIds.length > 1) {
    throw new Error('Private chat must have exactly 2 members')
  }

  const membersData: Prisma.ChatMemberCreateManyChatInput[] = membersIds.map(
    (m: string) => ({ userId: m }),
  );

  if (type === 'PUBLIC' ) {
      membersData.push({
        userId: session.user.id,
        role: "OWNER",
      });
  }

  const newChat = await prisma.chat.create({
    data: {
      type,
      members: {
        createMany: {
          data: membersData,
        },
      },
    },
  });

  return { newChat };
};
