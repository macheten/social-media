"use client";

import React, { useState } from "react";
import { cn } from "@shared/lib/utils";
import defaultAvatar from "@/public/images/default-avatar.png";
import { ChangeAvatarModal } from "../modals/avatar-modal";
import Image from "next/image";

interface Props {
  className?: string;
  imageUrl: string | null;
  size: number;
}

export const Avatar: React.FC<Props> = ({ className, imageUrl, size }) => {
  const [openModal, setOpenModal] = useState(false);
  const url = imageUrl ? imageUrl : defaultAvatar.src;
  const [imageKey, setImageKey] = useState(url)

  const onImageUpdate = (src: string) => {
    setImageKey(src)
    setOpenModal(false);
  };

  return (
    <div
      className={cn(
        className,
        `rounded-full border shadow mr-5 overflow-hidden cursor-pointer`
      )}
      style={{ width: size, height: size }}
    >
      <Image
        unoptimized={true}
        onClick={() => setOpenModal(true)}
        width={size}
        height={size}
        alt='аватарка'
        src={imageKey}
        key={imageKey}
      />
      <ChangeAvatarModal
        onImageUpdate={onImageUpdate}
        onClose={() => setOpenModal(false)}
        open={openModal}
      />
    </div>
  );
};
