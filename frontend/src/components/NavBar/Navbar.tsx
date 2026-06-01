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
    const mapping_icons  : Record<string, JSX.Element> = {
        profile: <UserPen className="h-5 w-5" />,
        createNotes: <CirclePlus className="h-5 w-5" />,
        AddCourses: <CirclePlus className="h-5 w-5" />,
        logout: <LogOut className="h-5 w-5" />
    }


    function ToDisplay(key: string | null): void {
      return;
    }

     
    return(      
      
   <>
             <div className="flex items-center justify-between px-3 py-2">
                    <button className=" text-md font-bold " onClick={home.ToHome}>StudyHub</button>
             </div>

             <div className="flex items-center justify-between gap-5">

               {Object.entries(items).map(([key, value]) =>
          value ? (
            <button key={key} className="flex items-center gap-2" onClick={() => ToDisplay(key)}>
              {mapping_icons[key]}
              <span>{value}</span>
            </button>
          ) : null
        )}
      
          
        </div>

    </>
    )
}