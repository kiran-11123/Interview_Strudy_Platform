import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {useLocation} from "react-router-dom"
import Navbar from "../NavBar/Navbar";
import { TopicCard } from "../topics/topic_card";
const Courses_API_URL = import.meta.env.VITE_Courses_API

export function CourseDetails(isAdmin : { isAdmin: boolean }) {

    const { CourseId } = useParams();
    const courseId = CourseId;
    const location = useLocation();

    const CourseName = location.state?.courseName || "Course Details";

    
    const [CourseData, setCourseData] = useState([]);
    const [message, setMessage] = useState("");
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const fetchTopics = async () => {
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
    };
    
    useEffect(() => {
        fetchTopics();
    }, [refreshTrigger])

    return (
        <div className="min-h-screen flex flex-col items-center justify-start max-w-full bg-gradient-to-br from-gray-50 to-gray-100">

            <div className="flex fixed z-100 max-w-sm sm:max-w-4xl text-sm sm:text-lg md:text-lg lg:max-w-full items-center justify-between bg-gray-800 text-white w-full rounded-lg px-5 py-3 cursor-pointer shadow-lg">
                
                {isAdmin ? (
                    <Navbar items={{ AddTopics: "AddTopics", logout: "Logout"  }} title={CourseName} course_id={CourseId} onTopicAdded={() => setRefreshTrigger(prev => prev + 1)} />
                ) : <Navbar items={{ logout: "Logout"  }} title={CourseName}  course_id={CourseId} />}
            </div>

            <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 mt-24 pb-8">
               

                {CourseData.length === 0 && !message ? (
                    <div className="text-center py-12">
                        <p className="text-lg text-gray-500">No topics available for this course yet.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {CourseData.map((topic: any, index: number) => (
                            <div key={topic.id || topic.topic_name} className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full font-semibold text-sm">
                                    {index + 1}
                                </div>
                                <div className="flex-grow">
                                    <TopicCard topic={topic} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}