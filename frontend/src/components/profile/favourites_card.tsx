
import { Trash } from "lucide-react"
import axios from "axios";
const CourseURL = import.meta.env.VITE_Courses_API


interface FavouritesDetails {
  _id: string,
  topic_name: string,
  topic_description : string,
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

            <div className="p-5 flex items-start justify-between gap-4 border-b border-black">

                <div>
                    <h1 className="text-xl font-bold text-white mb-2 ">
                        {favourites.topic_name}
                    </h1>

                </div>

              
            </div>

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
                {favourites.topic_description}
            </div>

        </div>
    );
}