import Navbar from "@/components/navbar/Navbar";
import { coursesData } from "@/utils/mock/courseDummy";
import CardCourse from "@/components/cardCourse/CardCourse";

export default function CoursePage() {
  return (
    <>
      <Navbar />
      <div className='h-full bg-slate-400 p-4 flex flex-wrap gap-4'>
        {coursesData.data.map((course) => (
          <CardCourse
            key={course.id}
            id={course.id}
            name={course.name}
            price={course.price}
          />
        ))}
      </div>
    </>
  );
}
