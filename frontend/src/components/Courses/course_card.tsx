import { Trash } from 'lucide-react'
import { CourseDetails } from './course_details'
import { useNavigate } from 'react-router-dom'

interface Courses {

    _id : string
    course_name: string
    course_description: string

}



interface CourseCardProps {
    course: Courses
    delete?: boolean
}



export function CourseCard({  course, delete: disabled = false }: CourseCardProps) {

    const navigate  = useNavigate();

    async function HandleDelete(e: any) {

        e.preventDefault();

    }


    function HandleNavigate(courseId: string) {
        navigate(`/course/${courseId}` ,{
            state : {
                courseId : courseId,
                courseName : course.course_name
            }
        });
    }


    return (
      <div className="
    group
    relative
    w-full
    max-w-sm
    min-h-[320px]
    rounded-2xl
    border
    border-white/20
    bg-black/70
    backdrop-blur-xl
    shadow-lg
    hover:shadow-xl
    transition-all
    duration-300
    overflow-hidden
">

    {/* Top Accent */}
   

    <div className="p-5 flex flex-col h-full justify-between">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">

            <div>
                <h1 className="
                    text-xl
                    font-bold
                    font-poppins
                    text-white
                    mb-2
                    transition-colors
                ">
                    {course.course_name}
                </h1>

                <span className="
                    text-xs
                    px-3
                    py-1
                    rounded-full
                    bg-indigo-500/20
                    text-indigo-200
                    border
                    border-indigo-400/20
                ">
                    Interview Course
                </span>
            </div>

            {disabled && (
                <button
                    title="Delete"
                    onClick={() => HandleDelete(course._id)}
                    className="
                        p-2
                        rounded-full
                        bg-white
                        transition-all
                        cursor-pointer
                    "
                >
                    <Trash className="w-5 h-5" />
                </button>
            )}
        </div>

        {/* Description */}
        <div className="mt-5 flex-1">
            <p className="
                text-gray-200
                leading-7
                text-sm
                md:text-base
                line-clamp-4
            ">
                {course.course_description}
            </p>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 ">
            <button className="
                w-full
                rounded-xl
                bg-gray-300
                py-2.5
                font-medium
                hover:opacity-90
                transition
                cursor-pointer
            " onClick={() => HandleNavigate(course._id)}>
                Explore Course
            </button>
        </div>

    </div>
</div>
    )
}   
