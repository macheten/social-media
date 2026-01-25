"use client";

import React, { useRef, useState } from "react";
import { cn } from "@shared/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { usePeopleStore } from "@/src/store/people-state";

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const inputRef = useRef(null);
  const [nameQuery, setNameQuery] = useState("");
  const updateNameQuery = usePeopleStore(state => state.setNameQuery)

  const onSubmit = () => {
    updateNameQuery(nameQuery)
  }
  return (
    <div className={cn(className, "flex items-center transform-border")}>
      <Input
        value={nameQuery}
        className='p-5'
        ref={inputRef}
        placeholder='Поиск по имени...'
        onChange={(e) => setNameQuery(e.currentTarget.value)}
      />

      {/* {nameQuery && ( */}
        <div className="ml-5">
          <Button onClick={onSubmit} size={'lg'} className="text-md">
            Найти
          </Button>
        </div>
      {/* )} */}
    </div>
  );
};
