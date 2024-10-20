/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import WidthWrapper from "../WidthWrapper";
import SearchBar from "./SearchBar";
import { Icons } from "../Icons";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { checkUserLogin } from "@/utils/auth";
import CardUser from "../cardUser/CardUser";
import { Logout } from "../logout/Logout";

export default async function Navbar() {
  const isUser = await checkUserLogin();
  const user: any = isUser?.username;
  const userName = user?.toString();

  return (
    <header className='relative h-full bg-transparent lg:mx-4 mt-2'>
      <WidthWrapper>
        <div className='flex h-16 items-center'>
          <div className='ml-4 flex lg:ml-0'>
            <Link href='/'>
              <Icons.logo />
            </Link>
          </div>
          <div className='lg:mx-8 lg:block'>
            <SearchBar />
          </div>
          <div className='ml-auto flex items-center'>
            <div className='hidden md:mr-6 lg:flex lg:flex-1 lg:items-center lg:justify-center lg:space-x-6'>
              {user ? (
                <CardUser />
              ) : (
                <Link
                  href='/Login'
                  className={cn(buttonVariants({ variant: "ghost" }))}
                >
                  Login
                </Link>
              )}

              <Separator className='h-6 w-px bg-gray-200' aria-hidden='true' />

              {user ? (
                <Logout name={userName} />
              ) : (
                <Link
                  href='/Register'
                  className={cn(buttonVariants({ variant: "ghost" }))}
                >
                  Register
                </Link>
              )}
            </div>
          </div>
        </div>
      </WidthWrapper>
    </header>
  );
}
