import { useEffect, useRef } from "react";

interface InfiniteScrollProps {
  fetching: boolean;
  hasNextPage: boolean;
  loadMore: () => void;
}

export const useInfiniteScroll = ({
  fetching,
  hasNextPage,
  loadMore,
}: InfiniteScrollProps) => {
  const endOfPage = useRef(null);
  const observer = useRef<IntersectionObserver>(null);

  useEffect(() => {
    if (fetching) return;
    if (observer.current) observer.current.disconnect();

    const callback: IntersectionObserverCallback = (entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        loadMore();
      }
    };
    observer.current = new IntersectionObserver(callback, {
      root: null,
      rootMargin: "1000px",
      threshold: 0,
    });
    observer.current.observe(endOfPage.current!);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [fetching, hasNextPage, loadMore]);

  return {
    endOfPage,
  };
};
