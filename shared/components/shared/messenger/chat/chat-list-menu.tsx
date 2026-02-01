import React from 'react';
import { cn } from '@shared/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/components/ui/dropdown-menu';
import { Button } from '@/shared/components/ui/button';
import { Menu } from 'lucide-react';

interface Props {
    className?: string;
}

export const ChatListMenu: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn(className)}>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className='shadow-none' variant={'outline'}>
                    <Menu />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
            <DropdownMenuItem>
                создать чат
            </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu>
    </div>
  );
};