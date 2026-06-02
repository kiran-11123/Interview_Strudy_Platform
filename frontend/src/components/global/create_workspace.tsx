
import { X } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

const Course_API_URL = import.meta.env.VITE_Courses_API

export function CreateWorkspace({isOpen , onClose} :{ isOpen?: boolean; onClose?: () => void }) {

    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');


      if (!isOpen) return null;


    async function handleSubmit(e: any) {

        e.preventDefault();


        try{

            const response =  await axios.post(`${Course_API_URL}workspaces/create` , {
                workspace_name : title
            } , {
                withCredentials: true
            })
           
            if(response.status === 200){
                setMessage(response.data.message);
                setTitle("");
            }
            else{
                setMessage(response.data.message);
            }

        }
        catch(error){
            setMessage("An error occurred while creating the workspace. Please try again.");
        }
        finally{
             
            setMessage("");
            setTitle("");

            onClose && onClose();
        }
    }



    return (


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
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        value={title}
                        className="w-full px-4 py-2 rounded-md border-2 text-black font-bold border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter Workspace Name"
                        type="text"
                    />

                    <div className="flex justify-end gap-2 text-sm mb-5">
                        <button onClick={handleSubmit} className="px-4 py-2 cursor-pointer bg-gradient-to-tr from-[#0891b2] via-[#1d4ed8] to-[#3730a3] text-white rounded-lg">
                            Submit
                        </button>
                    </div>

                    {message && <p className="text-right text-sm text-red-500">{message}</p>}

                </form>

            </div>


        </div>

    )

}