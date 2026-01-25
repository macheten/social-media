"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@shared/lib/utils";
import { PostItem } from "../profile/post-item";
import { PostDTO } from "@/types/types";
import {
  updatePost,
  UpdatePostProps,
} from "@/src/app/actions/profile/update-post";
import { deletePost } from "@/src/app/actions/profile/delete-post";
import { useRouter } from "next/navigation";
import { useCommentsState } from "@/src/store/comments-state";
import { PostSkeleton } from "../../skeletons/post-skeleton";
import { useSession } from "next-auth/react";

interface Props {
  className?: string;
  postId: string;
}

export const SinglePost: React.FC<Props> = ({ className, postId }) => {
  const post = useCommentsState((state) => state.post);
  const fetchPostById = useCommentsState((state) => state.fetchPostById);
  const setPost = useCommentsState((state) => state.setPost);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    setLoading(true);
    fetchPostById(postId).then(() => {
      setLoading(false);
    });
  }, []);

  const handleEdit = async (data: UpdatePostProps) => {
    await updatePost(data);
    setPost({ ...post, content: data.content, title: data.title });
  };

  const handleDelete = async (postId: string) => {
    await deletePost(postId);
    router.push(`/profile?userId=${post.authorId}`);
  };

  if (loading || status === "loading") {
    return <PostSkeleton className="mb-5" />;
  }

  return (
    <div className={cn(className)}>
      <PostItem
        handleDelete={handleDelete}
        onEditPost={handleEdit}
        postItem={post}
        hideCommentsButton
        isProfileOwner={post.authorId === session?.user.id}
      />
    </div>
  );
};
