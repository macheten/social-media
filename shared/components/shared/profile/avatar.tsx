"use client";

import React, { useState } from "react";
import { cn } from "@shared/lib/utils";
import defaultAvatar from "@/public/images/default-avatar.png";
import { ChangeAvatarModal } from "../modals/avatar-modal";
import Image from "next/image";
import { useProfileStore } from "@/src/store/profile-state";

interface Props {
  className?: string;
  size: number;
  isProfileOwner: boolean;
}

export const Avatar: React.FC<Props> = ({
  className,
  size,
  isProfileOwner,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const imageUrl = useProfileStore((state) => state.profile.imageUrl);

  const onImageClick = () => {
    if (isProfileOwner) {
      setOpenModal(true);
    }
  };

  return (
    <div
      className={cn(
        className,
        `rounded-full border shadow mr-5 overflow-hidden`,
        {'cursor-pointer': isProfileOwner}
      )}
      style={{ width: size, height: size }}
    >
      <Image
        loading='eager'
        unoptimized={true}
        onClick={onImageClick}
        width={size}
        height={size}
        alt='аватарка'
        src={imageUrl || defaultAvatar.src}
      />
      {isProfileOwner && (
        <ChangeAvatarModal
          onClose={() => setOpenModal(false)}
          open={openModal}
        />
      )}
    </div>
  );
};
