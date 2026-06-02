
import Navbar from "../NavBar/Navbar"

export default  function HomePage({ isAdmin }: { isAdmin: boolean }){
     
    return(
        <div className="h-screen max-w-full bg-gradient-to-r from-white-100 to-gray-100 flex flex-col items-center justify-start  font-poppins">

            <div className="flex fixed z-100 max-w-sm sm:max-w-4xl text-sm sm:text-lg md:text-lg   lg:max-w-full items-center justify-between bg-gray-800 text-white w-full rounded-lg px-5 py-3 cursor-pointer ">

             {isAdmin ? (
                <Navbar items={{ profile: "Profile" , createWorkspace: "Create Workspace" , AddCourses: "Add Courses" , logout: "Logout"  }} />
             ) : <Navbar items={{ profile: "Profile" , createWorkspace: "Create Workspace" , logout: "Logout"  }} />}


            </div>
            

            <div className="flex">

                Welcome Home

            </div>
             
        </div>



    )
}