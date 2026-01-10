import React from "react";
import { cn } from "@shared/lib/utils";
import { NavLink } from "./nav-link";
import { Home, Search, Settings, User } from "lucide-react";

interface Props {
  className?: string;
}

export const Navigation: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn(className, "sticky top-16")}>
        <NavLink href="/" text="Главная" Icon={Home} />
        <NavLink href="/profile" text="Профиль" Icon={User} />
        <NavLink href="/search" text="Поиск" Icon={Search} />
        <NavLink href="/profile" text="Настройки" Icon={Settings} />
        {/* <NavLink href="/profile" text="Звонки" Icon={PhoneCall} /> */}
        {/* <NavLink href="/profile" text="Друзья" Icon={User} /> */}
        {/* <NavLink href="/profile" text="Фото" Icon={Github} /> */}
        {/* <NavLink href="/profile" text="Музыка" Icon={Music} /> */}
    </div>
  );
};
