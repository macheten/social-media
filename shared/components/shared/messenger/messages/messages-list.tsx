import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@shared/lib/utils";
import { useMessagesStore } from "@/src/store/messages";
import { useInfiniteScroll } from "@/shared/lib/hooks/use-infinite-scroll";
import { MessageItem } from "./message-item";
import { ScrollArea } from "@/shared/components/ui/scroll-area";

interface Props {
  className?: string;
  chatId: string;
  authorizedId: string;
}

export const MessagesList: React.FC<Props> = ({
  className,
  chatId,
  authorizedId,
}) => {
  const {
    messages,
    fetchMessages,
    hasNextPage,
    isFetching,
    nextCursor,
    resetState,
  } = useMessagesStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (initialLoading && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length]);

  useEffect(() => {
    setInitialLoading(true);
    if (!nextCursor) {
      fetchMessages({ chatId, cursor: null }).then(() => {
        setInitialLoading(false);
      });
    }
    return () => resetState();
  }, [chatId]);

  const loadMore = async () => {
    if (initialLoading) return;
    if (scrollRef.current && endOfPage.current) {
      scrollRef.current.scrollTop =
        endOfPage.current.clientHeight + endOfPage.current.offsetHeight;
    }
    await fetchMessages({
      chatId,
      cursor: nextCursor,
    });
  };

  const { endOfPage } = useInfiniteScroll({
    fetching: isFetching,
    hasNextPage,
    loadMore,
  });

  return (
    <div ref={scrollRef} aria-disabled className={cn('h-full px-4 space-y-4, overflow-y-auto')}>
      <div className='py-2 pb-100 -mb-100' ref={endOfPage} />
      <div className='flex flex-col'>
        {messages.map((m) => (
          <MessageItem
            isMe={m.userId === authorizedId}
            className='mb-2'
            key={m.id}
            message={m}
          />
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
};
