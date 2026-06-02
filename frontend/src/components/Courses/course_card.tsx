import {Trash } from 'lucide-react'

interface Courses {
   
    course_name: string
    course_description: string
   
}

const mapping = {
    delete : <Trash className='h-5 w-5' /> 
}

interface CourseCardProps {
    id : string 
    course: Courses
    delete?: boolean
}


export function CourseCard({ id , course, delete: disabled = false }: CourseCardProps) {

    async function  HandleDelete(e:any) {

        e.preventDefault();
        
    }

    return (
        <div className=" w-full max-w-md   backdrop-blur-xl bg-white/20  border-white h-96 p-4 shadow-xl rounded-md flex flex-col border items-center justify-between">

                <div className='w-full flex items-center justify-between mb-1'>

                <h1 className="text-center px-2 py-1 font-poppins font-semibold  text-lg">
                    {course.course_name}
                </h1>

                <div className='flex justify-between gap-4 items-center'>

                    {disabled && (<button title="delete"
                        onClick={() => HandleDelete(id)}
                        className={`font-sm cursor-pointer rounded-full transition-shadow` }
                    >
                        <Trash />
                    </button>)}

                  
                </div>





            </div>

            

             <div className='text-md md:text-xl '>

                  <h2>
                 {course.course_description}
              </h2>


             </div>
        </div>
    )
}   
