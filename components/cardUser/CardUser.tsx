/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Book } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader } from "../ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

import { useMainStore } from "@/utils/providers/storeProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyLearning } from "@/services/getData";
import CartItems from "../cartItems/CartItems";
import { removeMyLearning } from "@/services/postData";

export default function CardUser() {
  const queryClient = useQueryClient();
  const state = useMainStore((state) => state);
  const { isOpen, setIsOpen } = state;

  const { data } = useQuery({
    queryKey: ["MYLEARNING"],
    queryFn: () => getMyLearning(),
    enabled: isOpen,
  });

  const isCart: number = data?.length ?? 0;
  const { mutate: removeCart } = useMutation({
    mutationFn: (cartId: number) => removeMyLearning(cartId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["MYLEARNING"] });
      console.log(data);
    },
    onError: (error) => {
      console.error("Error cannot delete cart:", error);
    },
  });

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className='group -m-2 flex items-center p-2'>
        <span
          className={buttonVariants({
            variant: "default",
            size: "sm",
            className: "text-sm text-muted-foreground",
          })}
        >
          <Book className={`h-6 w-6 flex-shrink-0`} />
          My Learnings
        </span>
      </SheetTrigger>
      <SheetContent className='flex w-full flex-col pr-2 sm:max-w-lg'>
        <SheetHeader className='space-y-2.5 pr-6 font-bold text-2xl'>
          {" "}
          My Learnings
        </SheetHeader>

        {isCart ? (
          data.map((item: any, index: number) => (
            <CartItems
              key={index}
              name={item?.course?.name}
              remove={() => removeCart(item?.id)}
            />
          ))
        ) : (
          <div className='flex h-full flex-col items-center justify-center space-y-1'>
            <div className='relative mb-4 h-96 w-96 text-muted-foreground'>
              <Image src='/Tiger-Cart.png' fill alt='tiger with a cart' />
            </div>
            <span className='text-gray-700 font-medium text-2xl'>
              This Cart is empty
            </span>
            <SheetTrigger asChild>
              <Link
                href='/product'
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "text-sm text-muted-foreground",
                })}
              >
                Add items to your cart
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
