
import { useState } from "react"
import { Link } from "react-router-dom";
import axios from "axios";
const BASEURL = import.meta.env.VITE_BASE_API;
export default function Register() {

    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [message, SetMessage] = useState('');
    const[username , SetUsername] = useState('');


   async  function SubmitForm(e:any) {

    e.preventDefault();

        try{

            const response :any = await axios.post(`${BASEURL}auth/signup`,{  
            name : username,
                email : email ,
           password :  password
                
            } ,{
                withCredentials : true
            })

            console.log(response)

            if(response.status === 201){
                   
                SetMessage(response.data.message);

                setTimeout(()=>{

                    SetMessage('');
                    SetEmail('');
                    SetPassword('');
                    SetUsername('');

                 },2000)

            }
            else{
                 SetMessage(response.data.message) ; 
            }

        }
        catch(er : any){
                if(er.response?.data?.message){
                    SetMessage(er.response.data.message);
                }
                else if(er.message){
                    SetMessage(er.message);
                }
                else{
                    SetMessage("An error occurred during registration. Please try again later.");
                }
        }
        finally{
             setTimeout(()=>{
                 
                SetMessage('');
             } , 2000)
        }


    }

    return (
        <div className="flex min-h-screen  flex-col items-center justify-center bg-gray-50 px-4 font-poppins">

            <div className="w-full max-w-md text-sm sm:text-base md:text-lg sm:max-w-lg rounded-xl px-8 shadow-2xl bg-white">


                <h1 className="font-bold  text-center text-lg sm:text-xl mb-6 mt-5">Register Here</h1>

                <form onSubmit={SubmitForm} className="space-y-3">

                    <div>

                        <div>
                            <label className="font-bold text-md sm:text-lg block mb-1">
                                Email
                            </label>

                            <input onChange={(e) => SetEmail(e.target.value)} required value={email} className="w-full px-4 py-2 text-sm rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Enter your Email" type="email" />
                        </div>

                    </div>

                         <div>

                        <div>
                            <label className="font-bold text-md sm:text-lg block mb-1">
                                Username
                            </label>

                            <input onChange={(e) => SetUsername(e.target.value)} required value={username} className="w-full text-sm px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Enter your Username" type="text" />
                        </div>

                    </div>


                    <div>

                        <div>
                            <label className="font-bold text-md sm:text-lg block mb-1">
                                Password
                            </label>

                            <input onChange={(e) => SetPassword(e.target.value)} required value={password} className="w-full text-sm px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Enter your Password" type="password" />
                        </div>

                    </div>


                    <button className="px-4 py-2 bg-blue-600 text-white text-sm  text-center rounded-md hover:bg-blue-800 cursor-pointer transition duration-300 mb-3">Submit</button>




                </form>


                <div className="w-full mb-5 flex flex-col justify-between items-center text-center " >

                    <p className="text-sm sm:text-lg text-gray-600">
                        Already have Account ?{" "}
                        <Link
                            to="/login"
                            className="text-blue-500 hover:underline cursor-pointer"
                        >
                            Login here
                        </Link>
                    </p>

                   

                </div>

                {message && (
                    <p className=" text-center sm:text-md mb-5">{message} </p>
                )}



            </div>

        </div>
    )
}