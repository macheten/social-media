import React from "react";
import { cn } from "@shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import defaultAvatar from "@/public/images/default-avatar.png";
import Link from "next/link";

interface Props {
  className?: string;
  title: string | null;
  imageUrl: string | null;
  authorizedId: string;
}

export const ChatPanelHeader: React.FC<Props> = ({
  className,
  imageUrl,
  title,
  authorizedId,
}) => {
  const router = useRouter();
  return (
    <div className={cn(className, "flex border-b p-2")}>
      <Button
        className='shadow-none mr-6'
        onClick={() => router.push("/messenger")}
        variant={"outline"}
      >
        <X />
      </Button>
      <Link
        href={`/profile?userId=${authorizedId}`}
        className='flex items-center'
      >
        <img
          className='w-10 h-10 rounded-full mr-2'
          src={imageUrl || defaultAvatar.src}
        />
        <div>{title}</div>
      </Link>
    </div>
  );
};
