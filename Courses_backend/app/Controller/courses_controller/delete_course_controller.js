import { delete_course_service } from "../../Service/courses_service/delete_course_service.js";


export const delete_course_controller = async(req,res)=>{
    try{

        const course_id = req.params.course_id;
        if(!course_id){
            return res.status(400).json({
                message : "Course_Id is null"
            })
        }
        const result = await delete_course_service(course_id);

        return res.status(200).json({
            message : "Course Deleted Successfully"
        })

    }
    catch(er){
        if(er.message === 'Course not found'){
            return res.status(404).json({
                message : "Course Not Found"
            })
        }   

        return res.status(500).json({
            message : `Internal Server Error , ${er.message}`
        })
    }


}