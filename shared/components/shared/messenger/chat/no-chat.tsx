import React from 'react';
import { cn } from '@shared/lib/utils';
import { MessagesSquare } from 'lucide-react';

interface Props {
    className?: string;
}

export const NoChat: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn(className, 'flex flex-col items-center justify-center')}>
        <MessagesSquare size={50} className='opacity-70 mb-3' />
        <div className='text-xl opacity-90'>Выберите чат</div>
        <div className='text-xl opacity-90'>или создайте новый</div>
    </div>
  );
};