import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Courses_API_URL = import.meta.env.VITE_Courses_API

export function CourseDetails(props : { isAdmin: boolean }) {

    const { CourseId } = useParams();
    const courseId = CourseId;
    
    console.log(courseId)
    
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
        <div className="p-5 flex flex-col h-full justify-between">
           
        </div>
    )
}