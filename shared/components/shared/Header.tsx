import React from "react";
import { Container } from "./Container";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { AuthModal } from "./modals/auth-modal/auth-modal";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <div className='sticky top-0 p-5 border-b shadow mb-10 items-center'>
      <Container className='flex justify-between'>
        <div>Header</div>

        <div>
          <AuthModal />

          <Button variant={"outline"} className='mr-2'>
            <Menu />
            Меню
          </Button>
        </div>
      </Container>
    </div>
  );
};
