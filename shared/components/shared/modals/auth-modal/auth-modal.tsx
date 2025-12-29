"use client";

import { Button } from "@shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/components/ui/dialog";
import { LogIn, UserPen } from "lucide-react";
import React, { useState } from "react";
import { LoginForm } from "../../forms/login-form";
import { RegisterForm } from "../../forms/register-form";
import { cn } from "@shared/lib/utils";
import { ToggleFormType } from "./toggle-form-type";

export const AuthModal: React.FC = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='mr-2'>
          <LogIn />
          Войти
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-2xl'>Авторизация</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col'>
          <ToggleFormType isLoginForm={isLoginForm} setIsLoginForm={setIsLoginForm} />
          {isLoginForm ? <LoginForm /> : <RegisterForm />}
        </div>
      </DialogContent>
    </Dialog>
  );
};
