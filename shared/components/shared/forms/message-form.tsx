import React from "react";
import { Field, Form, Formik } from "formik";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import { Send } from "lucide-react";

export const MessageForm: React.FC = () => {
  const initialValues = {
    content: "",
  };
  const onSubmit = async () => {

  }
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form className='p-3 border-t'>
        <div className='flex items-center h-full'>
          <Field
            name='content'
            as={Textarea}
            className='resize-none mr-2'
            placeholder='Сообщение...'
          />
          <Button type='submit' className="h-full w-15" >
            <Send />
          </Button>
        </div>
      </Form>
    </Formik>
  );
};
