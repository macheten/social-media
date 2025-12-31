'use client'

import React, { useEffect, useState } from "react";
import { Container } from "./Container";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { AuthModal } from "./modals/auth-modal/auth-modal";
import { AuthButton } from "./auth-button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export const Header: React.FC = () => {
  const [openModal, setOpenModal] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    if (searchParams.has('verified')) {
      setTimeout(() => {
        toast.success('Вы успешно подтвердили аккаунт!')
        router.push('/')
      }, 1000)
    }
  }, [])

  return (
    <div className='sticky top-0 p-5 border-b shadow mb-10 items-center'>
      <Container className='flex justify-between'>
        <Link className="text-2xl" href={'/'}>Social Media</Link>

        <div>
          <AuthButton onClick={() => setOpenModal(true)} />

          <Button variant={"outline"} className='mr-2'>
            <Menu />
            Меню
          </Button>
        </div>
        <AuthModal onClose={() => setOpenModal(false)} open={openModal} />
      </Container>
    </div>
  );
};
