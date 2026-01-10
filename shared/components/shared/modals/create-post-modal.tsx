import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { CreatePostForm } from "../forms/create-post-form";
import { AddPostBtn } from "../profile/add-post-btn";

export const CreatePostModal: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <AddPostBtn />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle hidden title='создать пост' />
        <div>
          <h1 className='text-2xl mb-5'>Создание поста</h1>

          <CreatePostForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};
