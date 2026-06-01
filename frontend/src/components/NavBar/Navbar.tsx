import { useState, type JSX } from "react"
import { StickyNotePlus  , UserPen  , CirclePlus , LogOut } from "lucide-react"
import { useHomeNavigation } from "../global/global_functions"
interface NavItems{
    profile? : string
    createNotes ? : string
    AddCourses ?  :string
    logout? : string
     
}

export default function Navbar({items}: {items: NavItems}){
    
    const [navitems, setNavitems] = useState<NavItems>(items);
    const home = useHomeNavigation();
    const mapping  : Record<string, JSX.Element> = {
        profile: <UserPen className="h-5 w-5" />,
        createNotes: <CirclePlus className="h-5 w-5" />,
        AddCourses: <CirclePlus className="h-5 w-5" />,
        logout: <LogOut className="h-5 w-5" />
    }

     
    return(      
      
   <>
             <div className="flex items-center justify-between px-3 py-2">
                    <button className=" text-md font-bold " onClick={home.ToHome}>StudyHub</button>
             </div>

             <div className="flex items-center justify-between gap-5">

                {Object.values(navitems ?? {}).map((item) =>
                    item ? (
                        <button key={item} >
                          
                            {mapping[item] || item}
                        </button>
                    ) : null
                )}
      
          
        </div>

    </>
    )
}