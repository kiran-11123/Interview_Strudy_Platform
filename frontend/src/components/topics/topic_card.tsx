

import {Heart , Trash} from 'lucide-react'
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import axios from 'axios';

import { AdminState } from "../../../atoms/admin_state"
import { useRecoilValue } from 'recoil';
const Courses_API_URL = import.meta.env.VITE_Courses_API


interface topic{
    _id : string
    topic_name : string,
    topic_description:string
}

interface TopicsData{
    topic :  topic
    
}

export function TopicCard({ topic }:TopicsData) {

    console.log("topics from topicCard"   , topic);
    const [isExpanded, setIsExpanded] = useState(false);
    const[message , setMessage] = useState('');

    const isAdmin = useRecoilValue(AdminState);


    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    async function DeleteTopic(topic_id : string) {

        
        
    }

    async function AddTopicToFavourites(topic_id : string){ 
        try{
            const response = await axios.post(`${Courses_API_URL}favourites/create` , {topic_id}, {
                withCredentials:true
            })

            if(response.status===200){
                 
                setMessage(response.data.message);
            }
            else {
                setMessage(response.data.message)
            }

        }
        catch(error : any){

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
        finally{
            setTimeout (() =>{
                setMessage('');
        } , 2000)

    }

    }

    return (


       
        <div className="flex flex-col gap-2 p-4 border border-gray-400 rounded-lg hover:shadow-md transition-shadow duration-200 bg-white">
            <div 
                onClick={toggleDescription}
                className="flex items-center justify-between cursor-pointer group"
            >
                <h3 className="text-lg font-semibold text-gray-800  transition-colors">
                    {topic.topic_name}
                </h3>
                <div className="text-gray-500 group-hover:text-gray-950 transition-colors">
                    {isExpanded ? (
                        <ChevronUp className="h-5 w-5" />
                    ) : (
                        <ChevronDown className="h-5 w-5" />
                    )}
                </div>
            </div>
            {isExpanded && (

                <div className="flex  flex-col items-center gap-5">

                    <p className="text-gray-700 text-sm leading-relaxed animate-in fade-in duration-200">
                    {topic.topic_description}
                </p>

                <div className="flex items-center justify-between w-full">

                  <button title="favourites" className='rounded-full shadow-lg p-2 bg-gray-300 hover:bg-gray-400' onClick={()=>AddTopicToFavourites(topic._id)}><Heart className='h-5 w-5 ' /> </button>  
                 {isAdmin && ( <button title ='delete_topic' className='rounded-full shadow-lg bg-gray-300 hover:bg-gray-400 p-2' onClick={()=>DeleteTopic(topic._id)}>   <Trash className='h-5 w-5' />  </button> ) } 

                </div>

                </div>
                
            )}
        </div>

    );
}