"use client";

import React from "react";
import { Button } from "@shared/components/ui/button";
import { LogIn, User } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface Props {
  className?: string;
  onClick: () => void;
}

export const AuthButton: React.FC<Props> = ({ className, onClick }) => {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return <Button loading className='mr-2 w-27' />
  }

  return (
    <>
      {session?.user ? (
        <Link href={"/profile"}>
          <Button className='mr-2'>
            <User />
            Профиль
          </Button>
        </Link>
      ) : (
        <Button onClick={onClick} className='mr-2'>
          <LogIn />
          Войти
        </Button>
      )}
    </>
  );
};
