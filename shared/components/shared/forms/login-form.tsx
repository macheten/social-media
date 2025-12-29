"use client";

import React from "react";
import { Field, Form, Formik } from "formik";
import { Input } from "@shared/components/ui/input";
import { Button } from "@shared/components/ui/button";
import { LogIn } from "lucide-react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { loginSchema } from "@shared/schemas/forms/auth-schemas";
import { ValidationMessage } from "../validation-message";

export const LoginForm: React.FC = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (data: typeof initialValues) => {
    console.log(data);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={toFormikValidationSchema(loginSchema)}
    >
      <Form>
        <div className='flex flex-col justify-center'>
          <div className='mb-5'>
            <div className='mb-2'>
              <Field
                name='email'
                placeholder='Введите почту'
                as={Input}
                className='mb-1'
              />
              <ValidationMessage name='email' />
            </div>
            <div>
              <Field
                name='password'
                placeholder='Введите пароль'
                as={Input}
                className='mb-1'
              />
              <ValidationMessage name='password' />
            </div>
          </div>
          <Button
            className='flex items-center self-center w-1/2'
            size={"lg"}
            type='submit'
          >
            Войти
            <LogIn />
          </Button>
        </div>
      </Form>
    </Formik>
  );
};
