import axios from "axios";
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

const Courses_API_URL = import.meta.env.VITE_Courses_API

export function CourseDetails({ courseId }: { courseId: string }) {


    const [CourseData, setCourseData] = useState([]);
    const [message, setMessage] = useState("");
    
    useEffect(() => {

        async function GetCourseData() {

            try {
                const response = await axios.post(`${Courses_API_URL}/courses?course_id=${courseId}`);

                if (response.status === 200) {

                    setCourseData(response.data);
                }
                else {

                    setMessage("Failed to fetch course data");
                }

            }
            catch (error) {


                setMessage("An error occurred while fetching course data");
            }


        }

        GetCourseData();

    }, [])

    return (
        <div>
            Course Details
        </div>
    )
}