"use client";

import React, { useState } from "react";
import { cn } from "@shared/lib/utils";
import { ProfileSkeleton } from "../../skeletons/profile-skeleton";
import { ArrowRight, Pencil, UserPlus } from "lucide-react";
import Link from "next/link";
import { Button } from "../../ui/button";
import { WhiteBlock } from "../white-block";
import { useProfile } from "@/shared/lib/hooks/use-profile";
import { Avatar } from "./avatar";

interface Props {
  className?: string;
  userId: string;
  isProfileOwner: boolean;
}

export const ProfileInfo: React.FC<Props> = ({
  className,
  userId,
  isProfileOwner,
}) => {
  const profile = useProfile(userId);

  return (
    <div className={cn(className)}>
      <WhiteBlock className='px-8 py-4'>
        {!profile ? (
          <ProfileSkeleton />
        ) : (
          <div className='flex justify-between'>
            <div className='flex items-start '>
              <Avatar size={150} imageUrl={profile.imageUrl} />
              <div className='inline-flex flex-col mb-0.5 max-w-62.5'>
                <div className='text-2xl font-bold'>{profile.username}</div>
                <div>
                  {!profile.about ? (
                    isProfileOwner && (
                      <Link href={"/profile/settings"} className='flex group'>
                        <span className='mr-2 text-primary font-mono'>
                          Написать о себе
                        </span>
                        <ArrowRight color='#7f22fe' strokeWidth={1} />
                      </Link>
                    )
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
              {isProfileOwner ? (
                <Link href={"/profile/settings"}>
                  <Button variant={"outline"}>
                    <Pencil />
                    Изменить профиль
                  </Button>
                </Link>
              ) : (
                <Button variant={"outline"}>
                  <UserPlus />
                  Добавить в друзья
                </Button>
              )}
            </div>
          </div>
        )}
      </WhiteBlock>
    </div>
  );
};
