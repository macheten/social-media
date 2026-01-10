"use client";

import React from "react";
import { cn } from "@shared/lib/utils";
import { WhiteBlock } from "../white-block";
import { useProfileStore } from "@/src/store/profile-state";
import defaultAvatar from "@/public/images/default-avatar.png";
import { Button } from "../../ui/button";
import { MessageCircle } from "lucide-react";

interface Props {
  className?: string;
  title: string;
  content: string;
}

export const PostItem: React.FC<Props> = ({ className, title, content }) => {
  const username = useProfileStore((state) => state.profile.username);
  // const imageUrl = useProfileStore((state) => state.profile.imageUrl);

  return (
    <div className={cn(className, "max-w-150 mb-2")}>
      <WhiteBlock className='p-3'>
        <div>
          <div className='flex items-center mb-2'>
            <div className='w-12.5 h-12.5 overflow-hidden border rounded-full mr-3 shadow'>
              <img alt='ava' src={defaultAvatar.src} />
            </div>
            <div className='text-xl font-mono text-primary'>{username}</div>
          </div>
          <div className='text-2xl'>{title}</div>
          <div className='py-3 border-b mb-2 wrap-break-word'>{content}</div>
          <div>
            <Button variant={"outline"} size={"default"}>
              <MessageCircle /> Комментарии
            </Button>
          </div>
        </div>
      </WhiteBlock>
    </div>
  );
};
