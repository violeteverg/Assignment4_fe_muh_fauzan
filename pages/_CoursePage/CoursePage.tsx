/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CardCourse from "@/components/cardCourse/CardCourse";
import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "@/services/getData";
import Bodypage from "../_BodyPage/BodyPage";

export default function CoursePage() {
  const page = 1;
  const { data, isLoading } = useQuery({
    queryKey: ["products", page],
    queryFn: () => getAllProduct(page),
    refetchOnMount: true,
  });

  const courseData = data?.data || [];
  const isHasData = courseData?.length !== 0;

  return (
    <>
      <Bodypage image='/bg-1.jpeg' text='Course' isHasData={isHasData}>
        <div className='h-full  p-4 flex flex-wrap '>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            courseData.map((course: any) => (
              <CardCourse
                key={course.id}
                id={course.id}
                name={course.name}
                price={course.price}
              />
            ))
          )}
        </div>
      </Bodypage>
    </>
  );
}
