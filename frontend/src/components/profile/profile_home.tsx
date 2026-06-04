import { useState } from "react"
import { useEffect } from "react";
import axios from "axios";
import Navbar from "../NavBar/Navbar";

const BASEURL = import.meta.env.VITE_BASE_API;
export function ProfileHome(){

    const[username , SetUsername] = useState('');
    const[message , setMessage] = useState('')


    useEffect(()=>{
         
        async function GetUSERDetails(){
             
             try {
            const response = await axios.post(`${BASEURL}auth/get_details` ,{} ,{
                withCredentials:true
            });

            console.log("username is " , response.data.username)
            if (response.status === 200) {
                SetUsername(response.data.username);
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

        GetUSERDetails();

    }, [])

     
    return(
        <div className="min-h-screen flex flex-col items-center justify-start max-w-full bg-gradient-to-br from-gray-50 to-gray-100">
        
                    <div className="flex fixed z-100 max-w-sm sm:max-w-4xl text-sm sm:text-lg md:text-lg lg:max-w-full items-center justify-between bg-gray-800 text-white w-full rounded-lg px-5 py-3 cursor-pointer shadow-lg">
                        
                            <Navbar items={{ createWorkspace: "createWorkspace", logout: "Logout"  }} title={username}  />
                    </div>


        </div>
        
    )
}