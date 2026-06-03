
import Navbar from "../NavBar/Navbar"
import { useEffect, useState } from "react"
import axios from "axios"

const Courses_API_URL = import.meta.env.VITE_Courses_API
import { CourseCard } from "../Courses/course_card"

export default  function HomePage({ isAdmin }: { isAdmin: boolean }){


    const [coursesData , setCoursesData] = useState([]);

    useEffect(()=>{

        async function GetCoursesData(){

            const response = await axios.post(`${Courses_API_URL}courses/get_all_courses` , {} , {
                withCredentials: true
            })

            if(response.status === 200){

                setCoursesData(response.data.courses);

                console.log(response.data.courses);
            }
            else {
                console.log("Failed to fetch courses data");
            }

        }

        GetCoursesData();

    },[])



    

    
     
    return(
        <div className="h-screen max-w-full bg-gradient-to-r from-gray-200 to-gray-600 flex flex-col items-center justify-between  font-poppins">

            <div className="flex fixed z-100 max-w-sm sm:max-w-4xl text-sm sm:text-lg md:text-lg   lg:max-w-full items-center justify-between bg-gray-800 text-white w-full rounded-lg px-5 py-3 cursor-pointer ">

             {isAdmin ? (
                <Navbar items={{ profile: "Profile" , createWorkspace: "Create Workspace" , AddCourses: "Add Courses" , logout: "Logout"  }} title="StudyHub" />
             ) : <Navbar items={{ profile: "Profile" , createWorkspace: "Create Workspace" , logout: "Logout"  }} title="StudyHub" />}


            </div>
            

         <div className="grid grid-cols-1 mt-20 sm:grid-cols-3 p-4 justify-center items-center md:grid-cols-4 gap-6">

    {coursesData.length === 0 ? (
        <div className="col-span-full flex justify-center items-center">
            <h1 className="text-lg font-medium">
                No courses available
            </h1>
        </div>
    ) : (
        coursesData.map((course) => (
            <CourseCard
                course={course}
                delete={isAdmin}
            />
        ))
    )}

</div>
             
        </div>



    )
}