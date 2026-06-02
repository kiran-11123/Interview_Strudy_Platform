import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASEURL = import.meta.env.VITE_BASE_API;
export default function Signin(){

    const navigate = useNavigate()

    const[password , SetPassword] = useState("")
    const[email , SetEmail] = useState("")
    const[message , SetMessage] = useState("")


    async function SubmitForm(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        try{

            const response =await axios.post(`${BASEURL}auth/signin` , {
                email,
                password
            }, {
                withCredentials: true
            })

            console.log(response)

            

            if(response.status === 200){

                  SetMessage(response.data.message);

                  const item = {
                     isAuthenticated : true,
                     expiry : Date.now() + 60 * 60 * 1000  , // 1 hour,
                     isAdmin : response.data.isAdmin

                  }

                  localStorage.setItem('isAuthenticated', JSON.stringify(item) );
                
                setTimeout(() => {
                    navigate('/home', { replace: true });
                }, 1000);
                

                  
            }
            else{
                  
                 SetMessage(response.data.message);
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
                SetMessage("An error occurred during Login. Please try again later.")
            }
        }
        finally{
             setTimeout(()=>{
                 SetEmail('');
                 SetPassword('');
                SetMessage('');
             } , 2000)
        }
        


    }
    return(
        <div className="flex min-h-screen  flex-col items-center justify-center bg-gray-50 px-4 font-poppins">
 <div className="w-full max-w-md text-sm sm:text-base md:text-lg sm:max-w-lg rounded-xl px-8 shadow-2xl bg-white">


                <h1 className="font-bold  text-center text-lg sm:text-xl mb-6 mt-5">Login Here</h1>

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
                            <label className="font-bold text-md sm:text-lg  block mb-1">
                                Password
                            </label>

                            <input onChange={(e) => SetPassword(e.target.value)} required value={password} className="w-full px-4 py-2 text-sm rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Enter your Password" type="password" />
                        </div>

                    </div>


                    <button className="px-4 py-2 bg-blue-600 text-white  text-sm  text-center rounded-md hover:bg-blue-800 cursor-pointer transition duration-300 mb-3">Submit</button>




                </form>


                <div className="w-full mb-5 flex flex-col justify-between items-center text-center " >

                    <p className="text-sm sm:text-lg text-gray-600">
                        Don’t have an account?{" "}
                        <Link
                            to="/register"
                            className="text-blue-500 hover:underline cursor-pointer"
                        >
                            Sign up
                        </Link>
                    </p>

                    <p className="text-sm sm:text-md text-gray-600 px-6 py-2 shadow-lg rounded-md">
                        <Link
                            to="/forget-password"
                            className="text-blue-500 hover:underline cursor-pointer font-bold"
                        >
                            Forget password ?
                        </Link>
                    </p>

                </div>

                {message && (
                    <p className="text-center sm:text-md mb-5">{message} </p>
                )}



            </div>

           
        </div>
    )
}