"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@shared/lib/utils";
import { WhiteBlock } from "./white-block";
import { usePeopleStore } from "@/src/store/people-state";
import { PersonItem } from "./person-item";
import { Loader } from "lucide-react";
import { PostSkeleton } from "../skeletons/post-skeleton";
import { UserSkeleton } from "../skeletons/user-skeleton";
import { SearchInput } from "./search-input";
import { useInfiniteScroll } from "@/shared/lib/hooks/use-infinite-scroll";

interface Props {
  className?: string;
}

export const PeopleList: React.FC<Props> = ({ className }) => {
  const {
    fetchPeople,
    hasNextPage,
    isFetchingPeople,
    nextCursor,
    people,
    nameQuery,
    resetState,
  } = usePeopleStore();
  const [initialLoading, setInitialLoading] = useState(true);

  const loadMore = () => {
    fetchPeople(nextCursor, nameQuery || "");
  };

  const { endOfPage } = useInfiniteScroll({
    fetching: isFetchingPeople,
    hasNextPage,
    loadMore,
  });

  useEffect(() => {
    setInitialLoading(true);
    fetchPeople(null, nameQuery || "").then(() => setInitialLoading(false));
    return () => resetState();
  }, [nameQuery]);

  return (
    <WhiteBlock className={cn(className, "p-4 max-w-150 mb-3")}>
      <h1 className='text-2xl mb-3'>Поиск</h1>
      <SearchInput className='mb-5' />

      <div className='px-3'>
        {people.map((p) => (
          <PersonItem
            className='mb-5'
            key={p.id}
            id={p.id}
            imageUrl={p.imageUrl}
            username={p.username}
          />
        ))}

        {initialLoading &&
          [...Array(10)].map((_, i) => (
            <UserSkeleton className='mb-5' key={i} />
          ))}
      </div>

      <div className='py-3 flex justify-center' ref={endOfPage}>
        {isFetchingPeople && !initialLoading && (
          <Loader className='animate-spin' />
        )}
      </div>
    </WhiteBlock>
  );
};
