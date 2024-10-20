"use client";

import { useForm } from "react-hook-form";
import { Icons } from "@/components/Icons";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { useMutation } from "@tanstack/react-query";

import { signInSchema, TSignInSchema } from "@/utils/schemas/LoginUser";
import { loginUser } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: (val: TSignInSchema) => {
      return loginUser(val);
    },
    onSuccess: () => {
      router.push("./course");
      router.refresh();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (val: TSignInSchema) => {
    mutate(val);
  };

  return (
    <>
      <div className='container relative flex pt-20 flex-col items-center justify-center lg:px0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[360px]'>
          <div className='flex flex-col items-center space-y-2 text-center'>
            <Icons.logo className='h-20 w-20' />
            <h1 className='text-2xl font-bold'>Login</h1>

            <Link
              href='/Register'
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
            >
              New to the site? Sign up now.
              <ArrowRight className='h-4 w-4' />
            </Link>
          </div>
          <div className='grid gap-6'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='grid gap-2'>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='email' className='mb-2'>
                    Email
                  </Label>
                  <Input
                    {...register("userLogin")}
                    placeholder='your@email.com'
                    className={cn({
                      "focus-within:ring-red-500": errors.userLogin,
                    })}
                  />
                  {errors.userLogin && (
                    <p className='text-red-500'>{errors.userLogin.message}</p>
                  )}
                </div>

                <div className='grid gap-1 py-2'>
                  <Label htmlFor='password' className='mb-2'>
                    Password
                  </Label>
                  <Input
                    {...register("password")}
                    placeholder='password'
                    type='password'
                    className={cn({
                      "focus-within:ring-red-500": errors.password,
                    })}
                  />
                  {errors.password && (
                    <p className='text-red-500'>{errors.password.message}</p>
                  )}
                </div>
                <Button type='submit'>Sign up</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
