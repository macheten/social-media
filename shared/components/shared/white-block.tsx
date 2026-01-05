import React, { PropsWithChildren } from 'react';
import { cn } from '@shared/lib/utils';

interface Props {
    className?: string;
}

export const WhiteBlock: React.FC<PropsWithChildren<Props>> = ({ className, children }) => {
  return (
    <div className={cn(className, 'bg-gray-50 rounded-2xl border')}>
        {children}
    </div>
  );
};