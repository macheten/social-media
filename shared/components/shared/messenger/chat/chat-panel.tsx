"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { cn } from "@shared/lib/utils";
import { ResizablePanel } from "@/shared/components/ui/resizable";
import { useChatsStore } from "@/src/store/chats";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { NoChat } from "./no-chat";
import { useShallow } from "zustand/react/shallow";
import { ChatPanelHeader } from "./chat-panel-header";
import { MessageForm } from "../../forms/message-form";
import { MessagesList } from "../messages/messages-list";

interface Props {
  className?: string;
  chatId: string | undefined;
  authorizedId: string;
}

export const ChatPanel: React.FC<Props> = ({
  className,
  chatId,
  authorizedId,
}) => {
  const [currentChat, fetchChatById] = useChatsStore(
    useShallow((state) => [state.currentChat, state.fetchChatById]),
  );

  useEffect(() => {
    fetchChatById(chatId || "");
  }, [chatId]);


  return (
    <div className={cn(className, "h-[calc(100vh-88px)]")}>
      {currentChat && chatId ? (
        <>
          <div className='h-full grid grid-rows-[auto_1fr_auto]'>
            <ChatPanelHeader
              authorizedId={authorizedId}
              imageUrl={currentChat.imageUrl}
              title={currentChat.title}
            />
            <MessagesList authorizedId={authorizedId} chatId={chatId} />

            <MessageForm />
          </div>
        </>
      ) : (
        <div className='h-full flex items-center justify-center'>
          <NoChat />
        </div>
      )}
    </div>
  );
};
