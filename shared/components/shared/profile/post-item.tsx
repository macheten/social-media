"use client";

import React, { useState } from "react";
import { cn } from "@shared/lib/utils";
import { WhiteBlock } from "../white-block";
import { useProfileStore } from "@/src/store/profile-state";
import defaultAvatar from "@/public/images/default-avatar.png";
import { Button } from "../../ui/button";
import {
  Forward,
  MessageCircle,
  Pencil,
  Share,
  ThumbsDown,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import { usePostStore } from "@/src/store/posts-state";
import toast from "react-hot-toast";
import { EditPostModal } from "../modals/edit-post-modal";
import Link from "next/link";
import { PostDTO } from "@/types/types";
import { UpdatePostProps } from "@/src/app/actions/profile/update-post";
import { toggleReaction } from "@/src/app/actions/toggle-reaction";

interface Props {
  className?: string;
  isProfileOwner: boolean;
  hideCommentsButton?: boolean;
  postItem: PostDTO;
  onEditPost: ({}: UpdatePostProps) => Promise<void>;
  handleDelete: (postId: string) => Promise<void>;
}

export const PostItem: React.FC<Props> = ({
  className,
  isProfileOwner,
  hideCommentsButton = false,
  postItem: post,
  onEditPost,
  handleDelete,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const onClickDelete = async () => {
    if (window.confirm("Вы точно хотите удалить этот пост?")) {
      try {
        setIsDeleting(true);
        // await deletePost(post.id);
        await handleDelete(post.id);
        toast.success("Пост удалён");
      } catch (error) {
        toast.error("Не удалось удалить");
      } finally {
        setIsDeleting(false);
      }
    }
  };
  const imageUrl = post.author.imageUrl;

  return (
    <div
      className={cn(className, "max-w-150", {
        "pointer-events-none opacity-40 select-none": isDeleting,
      })}
    >
      <WhiteBlock className='p-3'>
        <div>
          <div className='flex mb-2 justify-between'>
            <Link href={`/profile?userId=${post.authorId}`}>
              <div className='flex items-center'>
                <div className='w-12.5 h-12.5 overflow-hidden rounded-full mr-3'>
                  <img alt='ava' src={imageUrl || defaultAvatar.src} />
                </div>
                <div className='text-xl font-mono text-primary'>
                  {post.author.username}
                </div>
              </div>
            </Link>

            <div className='self-start'>
              <Button variant={"outline"} className='mr-1 shadow-none'>
                <Forward />
              </Button>
            </div>
          </div>
          <div className='text-2xl'>{post.title}</div>
          <div className='py-3 border-b mb-2 wrap-break-word whitespace-pre-wrap'>
            {post.content}
          </div>
          <div className='flex justify-between'>
            <div className="flex gap-1">
              <Button onClick={() => toggleReaction({ postId: post.id, type: 'LIKE' })} variant={'outline'}>
                <ThumbsUp />
              </Button>
              <Button onClick={() => toggleReaction({ postId: post.id, type: 'DISLIKE' })} variant={'outline'}>
                <ThumbsDown />
              </Button>
              {!hideCommentsButton && (
                <Link href={`/comments/${post.id}`} scroll={false}>
                  <Button variant={"outline"}>
                    <MessageCircle />
                    <span>Комментарии {post.commentsCount}</span>
                  </Button>
                </Link>
              )}
            </div>

            {isProfileOwner && (
              <div className='flex gap-1'>
                <EditPostModal
                  onEdit={onEditPost}
                  content={post.content}
                  title={post.title}
                  postId={post.id}
                />
                <Button onClick={onClickDelete}>
                  <Trash2 />
                </Button>
              </div>
            )}
          </div>
        </div>
      </WhiteBlock>
    </div>
  );
};
