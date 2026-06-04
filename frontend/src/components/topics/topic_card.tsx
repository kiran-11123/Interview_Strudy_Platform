


import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function TopicCard({ topic }: { topic: any }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    return (


       
        <div className="flex flex-col gap-2 p-4 border border-gray-400 rounded-lg hover:shadow-md transition-shadow duration-200 bg-white">
            <div 
                onClick={toggleDescription}
                className="flex items-center justify-between cursor-pointer group"
            >
                <h3 className="text-lg font-semibold text-gray-800  transition-colors">
                    {topic.topic_name}
                </h3>
                <div className="text-gray-500 group-hover:text-gray-950 transition-colors">
                    {isExpanded ? (
                        <ChevronUp className="h-5 w-5" />
                    ) : (
                        <ChevronDown className="h-5 w-5" />
                    )}
                </div>
            </div>
            {isExpanded && (
                <p className="text-gray-700 text-sm leading-relaxed animate-in fade-in duration-200">
                    {topic.topic_description}
                </p>
            )}
        </div>

    );
}