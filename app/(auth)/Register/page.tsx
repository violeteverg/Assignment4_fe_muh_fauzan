"use client";

import { useForm, Controller } from "react-hook-form";
import { Icons } from "@/components/Icons";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TSignUpschema, signUpSchema } from "@/utils/schemas/LoginUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/services/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";

export default function SignUp() {
  const [focused, setFocused] = useState(false);

  const router = useRouter();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<TSignUpschema>({ resolver: zodResolver(signUpSchema) });
  const passwordValue = watch("password");

  const { mutate } = useMutation({
    mutationFn: (val: TSignUpschema) => {
      return registerUser(val);
    },
    onSuccess: () => {
      router.push("./course");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (val: TSignUpschema) => {
    mutate(val);
  };

  return (
    <>
      <div className='flex mx-20 mt-20 flex-col items-center justify-center lg:px0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[360px] '>
          <div className='flex flex-col items-center space-y-2 text-center'>
            <Icons.logo className='h-20 w-20' />
            <h1 className='text-2xl font-bold'>Create an account</h1>

            <Link
              href='/Login'
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
            >
              Already have an account? sign-in
              <ArrowRight className='h-4 w-4' />
            </Link>
          </div>
          <div className='grid gap-6'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='grid gap-2'>
                <div className='grid gap-1 py-2'>
                  <Label className='mb-2'>Full Name</Label>
                  <Controller
                    control={control}
                    name='fullName'
                    render={({ field: { onChange, value } }) => (
                      <Input
                        onChange={onChange}
                        value={value}
                        placeholder='Full Name'
                        className={cn({
                          "focus-visible:ring-red-500": errors.fullName,
                        })}
                      />
                    )}
                  />
                </div>
                <div className='grid gap-1 py-2'>
                  <Label className='mb-2'>User Name</Label>
                  <Controller
                    control={control}
                    name='username'
                    render={({ field: { onChange, value } }) => (
                      <Input
                        onChange={onChange}
                        value={value}
                        placeholder='user name'
                        className={cn({
                          "focus-within:ring-red-500": errors.username,
                        })}
                      />
                    )}
                  />
                </div>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='email' className='mb-2'>
                    Email
                  </Label>
                  <Controller
                    control={control}
                    name='email'
                    render={({ field: { onChange, value } }) => (
                      <Input
                        onChange={onChange}
                        value={value}
                        placeholder='your@email.com'
                        className={cn({
                          "focus-within:ring-red-500": errors.email,
                        })}
                      />
                    )}
                  />
                  {errors.email && (
                    <span className='text-xs text-red-400'>
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className='grid gap-1 py-2'>
                  <Label htmlFor='password' className='mb-2'>
                    Password
                  </Label>
                  <Controller
                    control={control}
                    name='password'
                    render={({ field: { onChange, value } }) => (
                      <Input
                        type='password'
                        onChange={onChange}
                        value={value}
                        placeholder='password'
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        className={cn({
                          "focus-visible:ring-red-500":
                            focused &&
                            passwordValue &&
                            passwordValue.length < 8,
                        })}
                      />
                    )}
                  />
                  {focused && passwordValue && passwordValue.length < 8 && (
                    <span className='text-xs'>
                      Please enter at least 8 characters for password.
                    </span>
                  )}
                  {errors.password && (
                    <span className='text-xs text-red-400'>
                      {errors.password.message}
                    </span>
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
