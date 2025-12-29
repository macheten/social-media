import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { registerSchema } from "@shared/schemas/forms/auth-schemas";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { UserPen } from "lucide-react";
import React from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { ValidationMessage } from "../validation-message";

export const RegisterForm: React.FC = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = (data: typeof initialValues) => {
    console.log(data);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={toFormikValidationSchema(registerSchema)}
    >
      <Form>
        <div className='flex flex-col'>
          <div className='flex flex-col mb-5'>
            <Field
              name='name'
              placeholder='Имя пользователя'
              as={Input}
              className='mb-2'
            />
            <ValidationMessage name='name' />
            <Field
              name='email'
              placeholder='Введите почту'
              as={Input}
              className='mb-2'
            />
            <ValidationMessage name='email' />
            <Field
              name='password'
              placeholder='Введите пароль'
              as={Input}
              className='mb-2'
            />
            <ValidationMessage name='password' />
            <Field
              name='confirmPassword'
              placeholder='Подтверждение пароля'
              as={Input}
              className='mb-2'
            />
            <ValidationMessage name='confirmPassword' />
          </div>

          <Button type='submit' className='self-center w-1/2' size={"lg"}>
            Зарегистрироваться
            <UserPen />
          </Button>
        </div>
      </Form>
    </Formik>
  );
};
