import { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

const Course_API_URL = import.meta.env.VITE_Courses_API

export function CreateCourse({isOpen , onClose} :{ isOpen?: boolean; onClose?: () => void }) {

    const [courseName, setCourseName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    if (!isOpen) return null;

        async function handleSubmit(e: any) {

            e.preventDefault();
            
            try{

                if(!courseName || !description){

                    setMessage("Please fill all the fields");
                    return;
                }

                const response = await axios.post(`${Course_API_URL}courses/create_course` , {
                    course_name : courseName,
                    course_description : description
                } , {   
                    withCredentials : true
                })  

                if(response.status === 200){

                    setMessage(response.data.message);

                    setTimeout(() => {
                        setMessage("");
                        setCourseName("");
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
        finally{
            setTimeout(() => {
                setMessage("");
            }, 3000);
        }

    }



    return(

         <div className="flex items-center justify-center z-150 fixed inset-0 bg-black/50 backdrop-blur-sm">

            <div className="bg-white max-w-lg w-[90%] p-6 rounded-lg shadow-md space-y-4 font-poppins">

                <div className="text-md flex items-center justify-between">
                    <h3>Create Workspace</h3>

                    <button title='X' className='hover:bg-red-700 rounded-full bg-red-500' >

                        <X className="h-5 w-5" onClick={onClose} />

                    </button>


                </div>


                <form className='space-y-3'>

                    <input
                        onChange={(e) => setCourseName(e.target.value)}
                        required
                        value={courseName}
                        className="w-full px-4 py-2 rounded-md border-2 text-black font-semibold border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter Course Name"
                        type="text"
                    />

                     <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        value={description}
                        className="w-full px-4 py-2 rounded-md border-2 text-black font-semibold border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter Course Description"
                       
                    />

                    <div className="flex justify-end gap-2 text-sm mb-5">
                        <button onClick={handleSubmit} className=" px-4 py-2   font-semibold cursor-pointer bg-gradient-to-tr from-[#0891b2] via-[#1d4ed8] to-[#3730a3] text-white rounded-lg">
                            Create Course
                        </button>
                    </div>

                    {message && <p className="text-right text-black text-[14px]">{message}</p>}

                </form>

            </div>


        </div>

    )




}