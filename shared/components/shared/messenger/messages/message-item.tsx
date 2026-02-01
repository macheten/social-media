import React from "react";
import { cn } from "@shared/lib/utils";
import { MessageDTO } from "@/types/types";
import defaultAvatar from "@/public/images/default-avatar.png";

interface Props {
  className?: string;
  message: MessageDTO;
  isMe: boolean
}

export const MessageItem: React.FC<Props> = ({ className, message, isMe }) => {
  return (
    <div
      className={cn(
        className,
        "p-3 min-w-40 border rounded-3xl max-w-2/3 ",
        {
            'rounded-br-none bg-blue-50 self-end': isMe,
            'rounded-bl-none bg-white self-start': !isMe
        }
      )}
    >
      <div className='flex items-center mb-2'>
        <img
          src={message.user.imageUrl || defaultAvatar.src}
          className='rounded-full w-10 h-10 mr-2'
        />
        {message.user.username}
      </div>
      <div className='text-justify'>{message.content}</div>
    </div>
  );
};
