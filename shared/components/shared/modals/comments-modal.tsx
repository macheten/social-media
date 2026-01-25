"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../../ui/dialog";
import { useRouter } from "next/navigation";
import { CommentsList } from "../comments-list";
import { ScrollArea } from "../../ui/scroll-area";
import { CreateCommentForm } from "../forms/create-comment-form";
import notFoundIcon from "@/public/icons/not-found.svg";
import { useCommentsState } from "@/src/store/comments-state";
import { CommentsCount } from "../comments/comments-count";

interface Props {
  postId: string;
}

export const CommentsModal: React.FC<Props> = ({ postId }) => {
  const router = useRouter();
  const fetchPostById = useCommentsState((state) => state.fetchPostById);
  const post = useCommentsState((state) => state.post);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPostById(postId).then(() => {
      setLoading(false);
    });
  }, [postId]);

  // if (loading) {
  // return;
  // }

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent className='flex flex-col'>
        <DialogTitle hidden />

        <div>
          <DialogTitle title='комментарии' asChild>
            <CommentsCount marginClassName='mb-3' />
          </DialogTitle>
          <CreateCommentForm className='mb-3' postId={postId} />
          <ScrollArea className='h-90 px-4 -ml-4'>
            <CommentsList handleLinkClick={() => {
              router.back()
              setOpen(false)
            }} postId={postId} />
          </ScrollArea>
        </div>

        {!loading && !post && (
          <div className='flex items-center flex-col'>
            <DialogTitle className='text-xl text-center'>
              Пост не найден ❌
            </DialogTitle>
            <img
              src={notFoundIcon.src}
              width={100}
              height={100}
              alt='not found'
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
