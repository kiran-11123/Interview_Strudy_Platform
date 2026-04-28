import get_all_topics_course_service from "../../Service/courses_service/get_update_delete_topic_service.js";
import update_topic_course_service from "../../Service/courses_service/get_update_delete_topic_service.js";
import delete_topic_course_service from "../../Service/courses_service/get_update_delete_topic_service.js";
import { delete_all_topics_course_service } from "../../Service/courses_service/get_update_delete_topic_service.js";



export const get_topics_course_controller = async(req , res)=>{

    try{
        const {course_id} = req.params;
        const topics = await get_all_topics_course_service(course_id);
        res.status(200).json({message : 'topics retrieved successfully' , topics : topics});
    }
    catch(er){
        if(er.message === 'Course not found'){
            return res.status(404).json({message : er.message});
        }
        return res.status(500).json({message : 'internal server error'});
    }   

}


export const update_topic_course_controller = async(req , res)=>{

    try{
        const {course_id , topic_id} = req.params;

        const {topic_name , topic_description} = req.body;  

        const updated_topic = await update_topic_course_service(course_id , topic_id , topic_name , topic_description);
        res.status(200).json({message : 'topic updated successfully' , topic : updated_topic});
    }
    catch(er){
        if(er.message === 'Course not found'){
            return res.status(404).json({message : er.message});    
        }
        else if(er.message === 'Topic not found'){
            return res.status(404).json({message : er.message});
        }
        return res.status(500).json({message : 'internal server error'});
    }   
}   


export const delete_topic_course_controller = async(req , res)=>{

    try{
        const {course_id , topic_id} = req.params;

        const deleted_topic = await delete_topic_course_service(course_id , topic_id);
        res.status(200).json({message : 'topic deleted successfully' , topic : deleted_topic});
    }
    catch(er){
        if(er.message === 'Course not found'){

            return res.status(404).json({message : er.message});
        }
        else if(er.message === 'Topic not found'){
            return res.status(404).json({message : er.message});
        }
        return res.status(500).json({message : 'internal server error'});
    }   
}


export const delete_all_topics_course_controller = async(req , res)=>{
   

    try{

        const {course_id} = req.params;
        const deleted_topics = await delete_all_topics_course_service(course_id);
        res.status(200).json({message : 'all topics deleted successfully' , topics : deleted_topics});

    }
    catch(er){
        if(er.message === 'Course not found'){

            return res.status(404).json({message : er.message});
        }
        return res.status(500).json({message : 'internal server error'});
    }


}