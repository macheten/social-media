"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@shared/lib/utils";
import { Api } from "@/src/services";
import { ProfileSkeleton } from "../../skeletons/profile-skeleton";
import Image from "next/image";
import defaultAvatar from "@/public/images/default-avatar.png";
import { ArrowRight, AtSign, CircleUser, Pencil, User } from "lucide-react";
import { UserDTO } from "@/types/types";
import Link from "next/link";
import { Button } from "../../ui/button";
import { WhiteBlock } from "../white-block";
import { useProfile } from "@/shared/lib/hooks/use-profile";

interface Props {
  className?: string;
  userId: string;
  isProfileOwner: boolean;
}

export const ProfileInfo: React.FC<Props> = ({ className, userId }) => {
  const profile = useProfile(userId)

  return (
    <div className={cn(className)}>
      <WhiteBlock className="px-8 py-4">
        {!profile ? (
          <ProfileSkeleton />
        ) : (
          <div className='flex justify-between'>
            <div className='flex items-start '>
              <Image
                className='rounded-full border shadow mr-5'
                width={150}
                height={150}
                alt='аватарка'
                src={profile.imageUrl || defaultAvatar}
              />
              <div className='inline-flex flex-col mb-0.5 max-w-62.5'>
                <div className='text-2xl font-bold'>{profile.username}</div>
                <div>
                  {!profile.about ? (
                    <Link href={"/profile/settings"} className='flex group'>
                      <span className='mr-2 text-primary font-mono'>
                        Написать о себе
                      </span>
                      <ArrowRight color="#7f22fe" strokeWidth={1} />
                    </Link>
                  ) : (
                    <div>
                      <span className='text-primary'>О себе:</span>{" "}
                      <div className='text-black font-mono'>
                        {profile.about}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <Link href={'/profile/settings'}>
                <Button variant={"outline"}>
                  <Pencil />
                  Изменить профиль  
                </Button>
              </Link>
            </div>
          </div>
        )}
      </WhiteBlock>
    </div>
  );
};
