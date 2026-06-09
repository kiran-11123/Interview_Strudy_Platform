
import { Trash } from "lucide-react"
import axios from "axios";
const CourseURL = import.meta.env.VITE_Courses_API


interface WorkspaceDetails {
  _id: string,
  workspace_name: string,
  onDelete :(_id : string) =>void
}

interface WorkspaceCardProps {
  workspace: WorkspaceDetails,
}

export function WorkSpaceCard({workspace} : WorkspaceCardProps){
    

   async  function HandleNavigate(_id : string){

    }

    async function HandleDelete(_id : string){

        try{

            const response = await axios.delete(`${CourseURL}workspaces/delete/${_id}` ,{
                withCredentials : true
            })

            if (response.status === 200) {
             workspace.onDelete(_id);
    }

        }
        catch(error:any){

        }

    }

    return(
        <div className="
    group
    relative
    w-full
    max-w-sm
    min-h-[320px]
    rounded-2xl
    border
    border-white/20
    bg-black/70
    backdrop-blur-xl
    shadow-lg
    hover:shadow-xl
    transition-all
    duration-300
    overflow-hidden
">

    {/* Top Accent */}
   

    <div className="p-5 flex flex-col h-72 md:h-96 justify-between">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">

            <div>
                <h1 className="
                    text-xl
                    font-bold
                    font-poppins
                    text-white
                    mb-2
                    transition-colors
                ">
                    {workspace.workspace_name}
                </h1>

                <span className="
                    text-xs
                    px-3
                    py-1
                    rounded-full
                    bg-indigo-500/20
                    text-indigo-200
                    border
                    border-indigo-400/20
                ">
                    Personal Notes
                </span>
            </div>

           
                <button
                    title="Delete"
                    onClick={() => HandleDelete(workspace._id)}
                    className="
                        p-2
                        rounded-full
                        bg-white
                        transition-all
                        cursor-pointer
                    "
                >
                    <Trash className="w-5 h-5" />
                </button>
            
        </div>

      

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 ">
            <button className="
                w-full
                rounded-xl
                bg-gray-300
                py-2.5
                font-medium
                hover:opacity-90
                transition
                cursor-pointer
            " onClick={() => HandleNavigate(workspace._id)}>
                All Notes
            </button>
        </div>

    </div>
</div>
    )
}