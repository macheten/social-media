import { UpdatePostProps } from "@/src/app/actions/profile/update-post";
import { usePostStore } from "@/src/store/posts-state";
import { useEffect, useState } from "react";

interface UsePostsProps {
  userId: string;
}

export const usePosts = ({ userId }: UsePostsProps) => {
  const {
    editPost,
    deletePost,
    fetchPosts,
    endCursor: cursor,
    resetState,
    fetchingPosts,
    hasNextPage,
    posts,
  } = usePostStore();
  const [initialLoading, setInitialLoading] = useState(true);

  const handleEdit = async (data: UpdatePostProps) => {
    await editPost(data);
  };

  const handleDelete = async (postId: string) => {
    await deletePost(postId);
  };

  // initial fetch
  useEffect(() => {
    if (!cursor) {
      fetchPosts({ userId, cursor }).then(() => setInitialLoading(false));
    }
  }, [userId, cursor]);

  useEffect(() => {
    return () => {
      resetState();
      setInitialLoading(true)
    };
  }, [userId])

  return {
    fetchingPosts,
    endCursor: cursor,
    fetchPosts,
    hasNextPage,
    posts,
    handleEdit,
    handleDelete,
    initialLoading,
  };
};
