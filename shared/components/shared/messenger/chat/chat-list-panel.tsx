"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@shared/lib/utils";
import { ResizablePanel } from "@/shared/components/ui/resizable";
import { useChatsStore } from "@/src/store/chats";
import { useShallow } from "zustand/react/shallow";
import Link from "next/link";
import { ChatItem } from "./chat-item";
import { ChatListMenu } from "./chat-list-menu";
import { ChatSkeleton } from "@/shared/components/skeletons/chat-skeleton";

interface Props {
  className?: string;
}

export const ChatListPanel: React.FC<Props> = ({ className }) => {
  const [chats, fetchChats] = useChatsStore(
    useShallow((state) => [state.chats, state.fetchChats]),
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    fetchChats().then(() => setLoading(false));
  }, []);

  return (
    <div className={cn(className)}>
      <ChatListMenu className="mb-2" />
      {loading
        ? [...Array(5)].map((_, i) => <ChatSkeleton key={i} />)
        : chats.map((c) => (
            <ChatItem className='text-ellipsis' chat={c} key={c.id} />
          ))}
    </div>
  );
};
