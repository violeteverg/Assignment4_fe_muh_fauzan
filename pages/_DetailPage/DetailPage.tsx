/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import WidthWrapper from "@/components/WidthWrapper";
import { useToast } from "@/hooks/use-toast";
import { cn, formatPrice, getScheduleDetails } from "@/lib/utils";
import { getProductId } from "@/services/getData";
import { addMyLearning } from "@/services/postData";
import { TAddMylearning } from "@/utils/schemas/myLearnign";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CircleCheckBigIcon, CircleX } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function DetailPage() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const courseIdParams = searchParams ? searchParams.get("courseId") : null;
  const courseId = Number(courseIdParams);

  const { data: courseData } = useQuery({
    queryKey: ["COURSEID", courseId],
    queryFn: () => {
      return getProductId(+courseId);
    },
    enabled: !!courseId,
  });

  const { mutate } = useMutation({
    mutationFn: (val: TAddMylearning) => {
      return addMyLearning(val);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["MYLEARNING"] });
      toast({
        variant: "default",
        description: (
          <div className='flex gap-2 font-bold'>
            <CircleCheckBigIcon className='text-green-600' />
            <p>Succes add to my learning</p>
          </div>
        ),
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
    },
    onError: (error) => {
      console.log(">>>>> error", error);
      toast({
        variant: "destructive",
        description: (
          <div className='flex gap-2 font-bold'>
            <CircleX />
            <p>Login sek!!!!!!</p>
          </div>
        ),
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
    },
  });

  const addToCart = () => {
    if (courseData) {
      mutate({ courseId });
    }
  };

  return (
    <WidthWrapper className='flex justify-center items-center text-white h-screen'>
      <div className='flex border border-black rounded-lg h-[80%] w-[50%] px-5 py-2 gap-1'>
        <div className='w-[150%] h-full bg-teal-800 rounded-md flex flex-col justify-center items-center'>
          <div className='w-[80%] pb-5'>
            <h1 className='text-4xl font-[600]'>{courseData?.name}</h1>
            <p className='italic'>{courseData?.code}</p>
            <div className='w-full h-[200px] mt-6 overflow-auto'>
              <p>{courseData?.description}</p>
            </div>
            <div>
              <p>{formatPrice(courseData?.price)}</p>
            </div>
            <div className='w-full'>
              <h2 className='text-2xl font-bold'>Course Schedules</h2>
              {courseData?.courseSchedules &&
              courseData.courseSchedules.length > 0 ? (
                <ul className='list-disc pl-5'>
                  {courseData.courseSchedules.map((scheduleItem: any) => {
                    const { dayName, time } = getScheduleDetails(
                      scheduleItem.schedule.date
                    );
                    return (
                      <li key={scheduleItem.schedule.id}>
                        {`${dayName} - ${new Date(
                          scheduleItem.schedule.date
                        ).toLocaleDateString("id-ID")} -${time}`}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p>No schedules available</p>
              )}
            </div>
          </div>

          <div className='flex flex-col w-[80%] py-4 space-y-4'>
            <div className='flex justify-between gap-3 w-full'>
              <Button className='font-mono w-[100%]' onClick={addToCart}>
                <p className='font-[800]'>Add to My Learning</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </WidthWrapper>
  );
}
