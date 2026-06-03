import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {useLocation} from "react-router-dom"
import Navbar from "../NavBar/Navbar";
const Courses_API_URL = import.meta.env.VITE_Courses_API

export function CourseDetails(isAdmin : { isAdmin: boolean }) {

    const { CourseId } = useParams();
    const courseId = CourseId;
    const location = useLocation();

    const CourseName = location.state?.courseName || "Course Details";

    
    const [CourseData, setCourseData] = useState([]);
    const [message, setMessage] = useState("");
    
    useEffect(() => {

        async function GetCourseData() {

            try {
                const response = await axios.post(`${Courses_API_URL}courses/get_topics/${courseId}` ,{} ,{
                    withCredentials:true
                });
                console.log(response);

                if (response.status === 200) {

                    setCourseData(response.data.topics);
                }
                else {

                    setMessage(response.data.message || "Failed to fetch course data");
                }

            }
            catch (error :any) {


                if (error.response?.status === 401) {

                    setMessage("Unauthorized. Please login again.");
                    localStorage.removeItem("isAuthenticated");
             

                
            }

                else {

                    setMessage(
                        error.response?.data?.message ||
                        "Something went wrong"
                    );


                    
                }

            }


        }

        GetCourseData();

    }, [])

    return (
        <div className="h-screen flex flex-col items-center justify-start max-w-full">

                        <div className="flex fixed z-100 max-w-sm sm:max-w-4xl text-sm sm:text-lg md:text-lg   lg:max-w-full items-center justify-between bg-gray-800 text-white w-full rounded-lg px-5 py-3 cursor-pointer ">
                            
                             {isAdmin ? (
                                            <Navbar items={{ AddTopics: "AddTopics", logout: "Logout"  }} title={CourseName} />
                                         ) : <Navbar items={{ logout: "Logout"  }} title={CourseName} />}
                            

                        </div>

                        

           
        </div>
    )
}