import React from "react";
import { cn } from "@shared/lib/utils";
import Link from "next/link";
import defaultAvatar from "@/public/images/default-avatar.png";
import { Chat } from "@prisma/client";

interface Props {
  className?: string;
  chat: Chat;
}

export const ChatItem: React.FC<Props> = ({ className, chat }) => {
  return (
    <Link
      className={cn(className)}
      href={"/messenger?chatId=" + chat.id}
    >
      <div className='flex p-2 transition-all hover:bg-gray-100 rounded-2xl'>
        <img
          src={chat.imageUrl || defaultAvatar.src}
          alt='avatar'
          className='rounded-full mr-2'
          width={50}
          height={50}
        />
        <div className='text-primary font-semibold max-w-full overflow-hidden text-ellipsis whitespace-nowrap'>
          {chat.title}
        </div>
      </div>
    </Link>
  );
};
