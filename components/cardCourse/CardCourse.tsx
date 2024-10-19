interface CardProductsProps {
  id: number;
  name: string;
  price: number;
  image?: string;
}
export default function CardCourse({ id, name, price }: CardProductsProps) {
  console.log(id);
  return (
    <div className='w-[16vw] h-fit text-black justify-center items-center'>
      <div className='bg-[#ffffff] hover:bg-[#faf9f9] border border-[#f1eded] hover:scale-[105%] duration-300 p-3 flex flex-col items-center cursor-pointer hover:shadow-lg hover:border-[#000000] hover:border-opacity-20 group'>
        <div className='flex flex-col justify-center items-center w-full duration-10'>
          <hr className='w-6/12 my-2 transition-all duration-300 border border-y-1 border-[#e7e7e7]  ease-in-out group-hover:w-full group-hover:border-[#aeaeae]' />
        </div>

        <div className='flex flex-col justify-start items-start w-full group-hover:bg-[#ffffff] px-3 py-1 rounded-xl group-hover:shadow-md'>
          <h1 className='text-[16px] font-[400]  text-[#454545]'>{name}</h1>
          <p className='text-xl font-[800] font-serif'>{price}</p>
        </div>
      </div>
    </div>
  );
}
