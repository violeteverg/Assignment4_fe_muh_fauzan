"use client";

import { formatPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface CardProductsProps {
  id: number;
  name: string;
  price: number;
}
export default function CardCourse({ id, name, price }: CardProductsProps) {
  const router = useRouter();
  const cardClickHandler = (id: number) => {
    router.push(`/detail?courseId=${id}`);
  };
  return (
    <div className='w-[16vw] bg-slate-600 text-black justify-center items-center'>
      <div
        className='bg-[#ffffff] h-full hover:bg-[#faf9f9] space-y-2 border border-[#f1eded] hover:scale-[105%] duration-300 p-3 flex flex-col items-center cursor-pointer hover:shadow-lg hover:border-[#000000] hover:border-opacity-20 group'
        onClick={() => cardClickHandler(id)}
      >
        <div className='flex flex-col justify-center text-center items-center w-full h-full gap-y-2 group-hover:bg-[#ffffff] px-3 py-1 rounded-xl group-hover:shadow-md'>
          <h1 className='text-[16px] font-[400]  text-[#454545]'>{name}</h1>
        </div>
        <div className='flex flex-col justify-center items-center w-full duration-10'>
          <hr className='w-6/12 my-2 transition-all duration-300 border border-y-1 border-[#e7e7e7]  ease-in-out group-hover:w-full group-hover:border-[#aeaeae]' />
        </div>
        <p className='text-xl font-[800] font-serif'>
          {formatPrice(price, { notation: "compact" })}
        </p>
      </div>
    </div>
  );
}
