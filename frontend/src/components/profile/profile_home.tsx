import { useState } from "react"
import { useEffect } from "react";
import axios from "axios";
import Navbar from "../NavBar/Navbar";
import { CourseCard } from "../Courses/course_card";

const BASEURL = import.meta.env.VITE_BASE_API;
const CourseURL = import.meta.env.VITE_Courses_API
export function ProfileHome(){

    const[username , SetUsername] = useState('');
    const[message , setMessage] = useState('')

   const [activeTab, setActiveTab] = useState("favourites");
    const[favourites , SetFavourites] = useState([]);
    const[workspaces , SetWorkspaces] = useState([]);

    useEffect(()=>{
         
        async function GetUSERDetails(){
             
             try {
            const response = await axios.post(`${BASEURL}auth/get_details` ,{} ,{
                withCredentials:true
            });

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

  const handleFavourites = () => {
    setActiveTab("favourites");
    getFavourites();
  };


  const handleNotes = () => {
    setActiveTab("workspace");
    getUserWorkspace();
  };

    async function getFavourites() {
       

        try{

            

        }
        catch(er){

        }
        
    }

    async function getUserWorkspace(){
        try{

            const response = await axios.post(`${CourseURL}workspaces/get_user_workspaces` ,{} ,{
                withCredentials:true
            })

            console.log("Workspace response is " , response);

            if(response.status===200){
                setMessage(response.data.message);
                
                 SetWorkspaces(response.data.workspaces);
            }
            else{
                setMessage(response.data.message);
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
    }

     
    return(
        <div className="min-h-screen flex flex-col items-center justify-start max-w-full bg-gradient-to-br from-gray-50 to-gray-100">
        
                    <div className="flex fixed z-100 max-w-sm sm:max-w-4xl text-sm sm:text-lg md:text-lg lg:max-w-full items-center justify-between bg-gray-800 text-white w-full rounded-lg px-5 py-3 cursor-pointer shadow-lg">
                        
                            <Navbar items={{ createWorkspace: "createWorkspace", logout: "Logout"  }} title={`Welcome ${username}`}  />
                    </div>

                    <div className="flex justify-center gap-20 font-medium mt-20 ">
                         <button className={`pb-2 border-b-2 transition-all ${
          activeTab === "favourites"
            ? "border-blue-500 text-blue-500"
            : "border-transparent"
        }`} onClick={handleFavourites}>Favourites</button>
                        
                        <button  className={`pb-2 border-b-2 transition-all ${
          activeTab === "workspace"
            ? "border-blue-500 text-blue-500"
            : "border-transparent"
        }`} onClick={handleNotes}>My Workspaces</button>

                    </div>


        <div className="grid grid-cols-1 mt-20 sm:grid-cols-3 p-4 justify-center items-center md:grid-cols-4 gap-6">
               
               {workspaces.length === 0 ? (
                       <div className="col-span-full flex justify-center items-center">
                           <h1 className="text-lg font-medium">
                               No courses available
                           </h1>
                       </div>
                   ) : (
                       workspaces.map((course : any) => (
                           <CourseCard
                               key={course.id  || course.course_name}
                               course={course}
                               delete={true}
                           />
                       ))
                   )}
               
        </div>


        </div>
        
    )
}