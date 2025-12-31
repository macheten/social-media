'use client'

import React from 'react';
import { cn } from '@shared/lib/utils';
import { Button } from '@shared/components/ui/button';
import { signOut } from 'next-auth/react';

interface Props {
    className?: string;
}

export const ProfileInfo: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn(className)}>
        <Button onClick={() => signOut()} variant={'outline'}>Выйти из аккаунта</Button>
    </div>
  );
};