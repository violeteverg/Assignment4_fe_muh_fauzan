import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

interface CartItemsProps {
  name: string;
  remove: () => void;
}

export default function CartItems({ name, remove }: CartItemsProps) {
  console.log(name, "<<<<<");

  const handleRemoveCart = () => {
    remove();
  };
  return (
    <div>
      <div className='w-full flex rounded-xl border border-black p-2'>
        <div className='flex justify-between w-full items-center p-2'>
          <div className='flex flex-col items-start justify-center gap-y-1'>
            <h1 className='text-lg'>{name}</h1>
          </div>
          <div className='flex justify-center items-center gap-1'>
            <Button
              variant='default'
              className='flex items-center justify-center h-full text-black'
              onClick={handleRemoveCart}
            >
              <Trash2 className='h-[80%] w-[80%] hover:text-red-500' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
