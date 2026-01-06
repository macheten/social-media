"use client";

import React from "react";
import { Button } from "../../ui/button";
import { Image } from "lucide-react";
import { updateAvatar } from "@/src/app/actions/profile/update-avatar";
import toast from "react-hot-toast";

interface Props {
  onImageUpdate: (src: string) => void
}

export const ChangeAvatarForm: React.FC<Props> = ({ onImageUpdate }) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Выбран файл:", file);
      try {
        const res = await updateAvatar(file);
        if (res.success) {
          onImageUpdate(res.newImageUrl as string)
          toast.success(res.message)
        } else {
          toast.error(res.message)
        }
      } catch (error) {
        toast.error('Что-то пошло не так')
      }
    }
  };

  return (
    <form>
      <input
        onChange={handleFileChange}
        id='picture'
        className='hidden'
        type='file'
      />
      <Button asChild>
        <label htmlFor='picture' className='cursor-pointer'>
          <Image />
          Выбрать файл
        </label>
      </Button>
    </form>
  );
};
