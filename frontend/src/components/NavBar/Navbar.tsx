import { useState, type JSX } from "react"
import { StickyNotePlus  , UserPen  , CirclePlus , LogOut  , Menu} from "lucide-react"
import { useHomeNavigation , useProfile , useDashBoard} from "../global/global_functions"
import axios from "axios"
import  { CreateWorkspace  } from "../global/create_workspace";
import { CreateCourse } from "../Courses/create_course";

const BASEURL = import.meta.env.VITE_BASE_API;

interface NavItems{
    profile? : string
    createWorkspace ? : string
    AddCourses ?  :string
    logout? : string
     
}

export default function Navbar({items}: {items: NavItems}){
    
    const home = useHomeNavigation();
    const profile = useProfile();
    const dashBoard = useDashBoard();
    const mapping_icons  : Record<string, JSX.Element> = {
        profile: <UserPen className="h-5 w-5" />,
        createWorkspace : <CirclePlus className="h-5 w-5" />,
        AddCourses: <StickyNotePlus className="h-5 w-5" />,
        logout: <LogOut className="h-5 w-5" />
    }
    
    const[open ,isOpen] = useState(false);
    const[WorkSpaceopenModal , setWorkSpaceOpenModal] = useState(false);
    const[CourseOpenModal , setCourseOpenModal] = useState(false);


    
    async function ToLogout(){

        try{

            const response = await axios.post(`${BASEURL}auth/logout` , {} , {
                withCredentials: true
            })
            
            if(response.status === 200){

                localStorage.removeItem("isAuthenticated");
                dashBoard.ToDashBoard()
                
            }
           

        }
        catch(error : any){

            if (error.response?.status === 401) {

        localStorage.removeItem("isAuthenticated");
        dashBoard.ToDashBoard();
    }


        }
       
    }
   
    function ToCreateWorkspace(){
         
        setWorkSpaceOpenModal(true);
    }

    function ToAddCourses(){
        setCourseOpenModal(true);
    }
  





    function ToDisplay(key: string | null): void {
         
         switch(key){
            case  "profile" : profile.ToProfile() ; break;
            case "createWorkspace" : ToCreateWorkspace() ; break;
            case "AddCourses" : ToAddCourses() ; break;
            case "logout" : ToLogout() ; break;
         }
    }
    
    
     
    return(      
      
   <>
             <div className="flex items-center justify-between px-3 py-2">
                    <button className=" text-md font-bold " onClick={home.ToHome}>StudyHub</button>
             </div>

             <div className=" items-center justify-between gap-5 hidden sm:flex">

               {Object.entries(items).map(([key, value]) =>
          value ? (
            <button key={key} className="flex items-center gap-2 cursor-pointer" onClick={() => ToDisplay(key)}>
              {mapping_icons[key]}
              <span>{value}</span>
            </button>
          ) : null
        )}
      
          
        </div>

        <div className="sm:hidden flex items-center">
                <button  title="Toggle Menu" onClick={() => isOpen(!open)} className="text-white focus:outline-none">

                        <Menu className="h-6 w-6" />
                </button>
        </div>  


        {open &&(
            <div className="absolute top-16 right-4 bg-gray-800 text-white rounded-md shadow-lg p-4 flex flex-col items-start gap-3">
                {Object.entries(items).map(([key, value]) =>
          value ? (
            <button key={key} className="flex items-center gap-2 cursor-pointer" onClick={() => ToDisplay(key)}>
              {mapping_icons[key]}
              <span>{value}</span>
            </button>
          ) : null
        )}
            </div>
            
        )}

        <CreateWorkspace isOpen={WorkSpaceopenModal} onClose={()=>setWorkSpaceOpenModal(false)} />
        <CreateCourse isOpen={CourseOpenModal} onClose={()=>setCourseOpenModal(false)} />

    </>
    )
}