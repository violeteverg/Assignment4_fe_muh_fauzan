"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface LogoutProps {
  name: string;
}
export function Logout({ name }: LogoutProps) {
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: () => logout(),
    onSuccess: (data) => {
      console.log(data);
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const logoutHandler = () => {
    mutate();
  };
  //   console.log(name);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <h1
          className={buttonVariants({
            variant: "outline",
            size: "lg",
            className: "text-sm text-muted-foreground !text-black",
          })}
        >
          {name}
        </h1>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 flex flex-col items-center p-2'>
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Button className='w-full' onClick={logoutHandler}>
          Logout
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
