
import {useState} from "react";
import axios from "axios";
import {X} from "lucide-react";

const Course_API_URL = import.meta.env.VITE_Courses_API

interface AddTopicProps {
    isOpen?: boolean;
    onClose?: () => void;
    course_id : string | undefined;
}

export function AddTopic({isOpen, onClose, course_id}: AddTopicProps) {

    const [topicName, setTopicName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');


    if (!isOpen) return null;

        async function handleSubmit(e: any) {
            e.preventDefault();
            
            try{

                if(!topicName || !description){

                    setMessage("Please fill all the fields");
                    return;
                }

                const response = await axios.post(`${Course_API_URL}courses/create_topic` , {
                    course_id : course_id , 
                    topic_name : topicName,
                    topic_description : description
                } , {   
                    withCredentials : true
                })  

                if(response.status === 200){

                    setMessage(response.data.message);
                    setTimeout(() => {
                        setMessage("");
                        setTopicName("");   

                        setDescription("");
                        onClose && onClose();
                    }

                    , 2000);

                }       
            }
            catch(error:any){
                if (error.response?.status === 401) {
                    setMessage("Unauthorized. Please login again.");
                    localStorage.removeItem("isAuthenticated");
                    onClose && onClose();

         
                }
                else {
                    setMessage(
                        error.response?.data?.message ||
                        "Something went wrong"
                    );
                }
            }
        }  

    return ( 

       
        <div className="flex items-center justify-center z-150 fixed inset-0 bg-black/50 backdrop-blur-sm">

            <div className="bg-white max-w-lg w-[90%] p-6 rounded-lg shadow-md space-y-4 font-poppins">

                <div className="text-md flex items-center justify-between">
                    <h3>Create Topic</h3>

                    <button title='X' className='hover:bg-red-700 rounded-full bg-red-500' >

                        <X className="h-5 w-5" onClick={onClose} />

                    </button>


                </div>


                <form className='space-y-3'>

                    <input
                        onChange={(e) => setTopicName(e.target.value)}
                        required
                        value={topicName}
                        className="w-full px-4 py-2 rounded-md border-2 text-black font-semibold border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter Topic Name"
                        type="text"
                    />

                      <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        value={description}
                        className="w-full px-4 py-2 rounded-md border-2 text-black font-semibold border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter Topic Description"
                    />

                    <div className="flex justify-end gap-2 text-sm mb-5">
                        <button onClick={handleSubmit} className="px-4 py-2 cursor-pointer bg-gradient-to-tr from-[#0891b2] via-[#1d4ed8] to-[#3730a3] text-white rounded-lg">
                            Submit
                        </button>
                    </div>

                    {message && <p className="text-right text-black text-md">{message}</p>}

                </form>

            </div>


        </div>

    )
}
        