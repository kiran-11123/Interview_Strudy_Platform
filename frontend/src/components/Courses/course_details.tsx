import axios from "axios";
import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import {useLocation} from "react-router-dom"
import { useRecoilValue } from "recoil"
import { AdminState } from "../../atoms/AdminState";
import Navbar from "../NavBar/Navbar";
import { TopicCard } from "../topics/topic_card";
const Courses_API_URL = import.meta.env.VITE_Courses_API

export function CourseDetails() {
    const isAdmin = useRecoilValue(AdminState);

    const { CourseId } = useParams();
    const courseId = CourseId;
    const location = useLocation();

    const CourseName = location.state?.courseName || "Course Details";

    
    const [CourseData, setCourseData] = useState([]);
    const [message, setMessage] = useState("");
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const topicRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const fetchTopics = async () => {
        try {
            const response = await axios.post(`${Courses_API_URL}courses/get_topics/${courseId}` ,{} ,{
                withCredentials:true
            });
           

            if (response.status === 200) {

                setCourseData(response.data.topics);
                console.log(setCourseData)
                
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

    const handleTopicClick = (topicId: string) => {
        setSelectedTopic(topicId);
        const element = topicRefs.current[topicId];
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start max-w-full bg-gradient-to-br from-gray-50 to-gray-100">

            <div className="flex fixed z-100 max-w-sm sm:max-w-4xl text-sm sm:text-lg md:text-lg lg:max-w-full items-center justify-between bg-gray-800 text-white w-full rounded-lg px-5 py-3 cursor-pointer shadow-lg">
                
                {isAdmin ? (
                    <Navbar items={{ AddTopics: "AddTopics", logout: "Logout"  }} title={CourseName} course_id={CourseId} onTopicAdded={() => setRefreshTrigger(prev => prev + 1)} />
                ) : <Navbar items={{ logout: "Logout"  }} title={CourseName}  course_id={CourseId} />}
            </div>

            <div className="flex w-full mt-16">
                {/* Sidebar */}
                <div className="hidden lg:flex lg:w-64 flex-col bg-white shadow-lg fixed left-0 h-screen overflow-y-auto border-r border-gray-200">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="text-lg font-bold text-gray-800">Topics</h2>
                    </div>
                    <div className="flex flex-col">
                        {CourseData.length > 0 ? (
                            CourseData.map((topic: any) => (
                                <button
                                    key={topic.id || topic.topic_name}
                                    onClick={() => handleTopicClick(topic.id || topic.topic_name)}
                                    className={`px-4 py-3 text-left border-l-4 transition-all ${
                                        selectedTopic === (topic.id || topic.topic_name)
                                            ? 'border-blue-600 bg-blue-50 text-blue-600 font-semibold'
                                            : 'border-transparent text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <p className="truncate">{topic.topic_name}</p>
                                </button>
                            ))
                        ) : (
                            <div className="p-4 text-gray-500 text-sm">
                                No topics available
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="w-full lg:ml-64 px-4 sm:px-6 lg:px-8 mt-8 pb-8">
                    {CourseData.length === 0 && !message ? (
                        <div className="text-center py-12">
                            <p className="text-lg text-gray-500">No topics available for this course yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-4 max-w-4xl">
                            {CourseData.map((topic: any) => (
                                <div 
                                    key={topic.id || topic.topic_name}
                                    ref={(el) => {
                                        if (el) topicRefs.current[topic.id || topic.topic_name] = el;
                                    }}
                                >
                                    <TopicCard topic={topic} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}