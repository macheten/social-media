"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@shared/lib/utils";
import { Post } from "@prisma/client";
import { Api } from "@/src/services";
import { PostSkeleton } from "../../skeletons/post-skeleton";
import { PostItem } from "./post-item";
import { Loader } from "lucide-react";

interface Props {
  className?: string;
  userId: string;
  isProfileOwner: boolean;
}

export const PostsList: React.FC<Props> = ({ className, userId }) => {
  const [items, setItems] = useState<Post[]>([]);
  const [cursor, setCursor] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const endOfPage = useRef(null);
  const observer = useRef<IntersectionObserver>(null);

  const loadItems = async () => {
    setLoading(true);
    const { endCursor, hasNextPage, posts } = await Api.posts.fetchPosts({
      cursor,
      userId,
    });
    setItems((prevItems) => [...prevItems, ...posts]);
    setCursor(endCursor);
    setHasMore(hasNextPage);
    setLoading(false);
  };

  console.log(userId);
  console.log(cursor);

  useEffect(() => {
    if (!cursor) {
      loadItems();
    }

    return () => {
      setItems([]);
      setCursor(null);
      setHasMore(true);
    };
  }, [userId]);

  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    const callback: IntersectionObserverCallback = (entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadItems();
      }
    };
    observer.current = new IntersectionObserver(callback);
    observer.current.observe(endOfPage.current!);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, hasMore, userId, cursor]);

  return (
    <div className={cn(className)}>
      {items.map((post, i) => (
        <PostItem
          key={post.id}
          content={post.content}
          title={`#${i + 1} ${post.title}`}
        />
      ))}
      {loading && <Loader className='animate-spin' />}
      <div ref={endOfPage} className='py-2'></div>
    </div>
  );
};
