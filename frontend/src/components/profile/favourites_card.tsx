
import { Trash } from "lucide-react"
import axios from "axios";
const CourseURL = import.meta.env.VITE_Courses_API


interface FavouritesDetails {
  _id: string,
  title: string,
  description : string,
  onDelete :(_id : string) =>void
}

interface FavouritesCardProps {
  favourites: FavouritesDetails,
}
export function FavouritesCard({ favourites }: FavouritesCardProps) {

    async function HandleDelete(_id: string) {
        try {
            const response = await axios.delete(
                `${CourseURL}workspaces/delete/${_id}`,
                { withCredentials: true }
            );

            if (response.status === 200) {
                favourites.onDelete(_id);
            }
        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <div className="
            group
            relative
            w-full
            max-w-sm
            h-[420px]
            rounded-2xl
            border
            border-white/20
            bg-black/70
            backdrop-blur-xl
            shadow-lg
            transition-all
            duration-300
            overflow-hidden
            flex flex-col
        ">

            {/* Header */}
            <div className="p-5 flex items-start justify-between gap-4 border-b border-white/10">

                <div>
                    <h1 className="text-xl font-bold text-white mb-2">
                        {favourites.title}
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
                    onClick={() => HandleDelete(favourites._id)}
                    className="
                        p-2
                        rounded-full
                        bg-white
                        hover:bg-red-100
                        transition
                        cursor-pointer
                    "
                >
                    <Trash className="w-5 h-5" />
                </button>
            </div>

            {/* Notepad-style scroll area */}
            <div className="
                flex-1
                p-4
                overflow-y-auto
                bg-white/5
                font-mono
                text-sm
                text-gray-200
                leading-relaxed
                whitespace-pre-wrap
            ">
                {favourites.description}
            </div>

        </div>
    );
}