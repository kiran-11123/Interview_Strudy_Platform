import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Menu, X } from "lucide-react"


export default function DashBoard(){

    const navigate= useNavigate()

    function ToRegister(){
        navigate("/register")
    }

       function ToLogin(){
        navigate("/login")
    }

    const[open , isOpen]  = useState(false)

 
    
    return(
        <div className="bg-gray-100 h-screen flex flex-col items-center gap-10 justify-start ">



               <div className="flex  max-w-sm sm:max-w-4xl text-sm sm:text-lg md:text-lg   lg:max-w-full items-center justify-between bg-gradient-to-r from-blue-900 to-violet-800 text-white w-full rounded-lg px-5 py-3 cursor-pointer ">
                    <div className="px-4 py-2 rounded-md font-bold">
                         Interview Prep
                    </div>

                    <div className="hidden sm:flex  items-center justify-between gap-10 font-serif">

                         <button onClick={ToLogin} className="px-4 py-2 cursor-pointer hover:bg-gradient-to-tr from-white/20 via-white/10 to-transparent  rounded-md  shadow-md">
                              Login
                         </button>

                         <button onClick={ToRegister} className="px-4 py-2 cursor-pointer hover:bg-gradient-to-tr from-white/20 via-white/10 to-transparent  rounded-md  shadow-md">
                              Register
                         </button>

                    </div>

                    <div className="sm:hidden flex items-center">
                         <button onClick={() => isOpen(!open)} className="text-white focus:outline-none">
                              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                         </button>
                    </div>




               </div>





               <div className="flex flex-col items-center font-poppins gap-6 justify-center w-full px-4 cursor-pointer font-roboto">

                    {open && (
                         <div className="sm:hidden w-full max-w-xl px-6 mt-2 flex flex-col gap-2 bg-[#0f0c29]  text-white rounded-xl shadow-lg text-center text-sm py-4">
                              <button onClick={ToLogin} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition font-medium">
                                   Login
                              </button>
                              <button onClick={ToRegister} className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition font-medium">
                                   Register
                              </button>
                         </div>
                    )}

                    <div className="flex flex-col text-center bg-white/20 backdrop-blur-md border border-white/20 px-8 py-6 rounded-2xl shadow-lg max-w-lg sm:max-w-xl md:max-w-2xl ">




                         <p className="text-sm sm:text-base leading-relaxed font-bold mb-2">
                            Train for Interviews. Perform with Confidence.
                         </p>

                         <p>A modern interview preparation platform designed for ambitious careers.
Sharpen your skills and walk into interviews ready to succeed.</p>
                    </div>


               </div>




          </div>
    )
}