import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  href: string;
  text: string;
  Icon: LucideIcon;
}

export const NavLink: React.FC<Props> = ({ href, Icon, text }) => {
  return (
    <Link href={href} className="flex items-center hover:bg-gray-300 hover:opacity-80 rounded-md p-1 mb-1 transition-all ease-in-out">
      <Icon color='#7f22fe' size={22} className="mr-3" />
      <span className="text-md">{text}</span>
    </Link>
  );
};
