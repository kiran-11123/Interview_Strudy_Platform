import { get_all_courses_service  , get_course_service } from "../../Service/courses_service/get_course_service.js";


export const get_course_controller = async(req , res)=>{

    try{ 

        const course_id = req.params.course_id;

        if(!course_id){
            return res.status(400).json({
                message : 'Course_Id is null '
            })
        }

        const result = await get_course_service(course_id);

        return res.status(200).json({
            message: "Data Fetched Successfully",
            data : result
        })

    }
    catch(er){
           
        if(er.message === 'Course not found'){
            return res.status(404).json({
                message : 'Course Not Found'
            })
        }
        return res.status(500).json({
            message : `Internal Server Error , ${er.message}` 
        })
    }

}



export const get_all_courses_controller = async(req,res)=>{
     
    try{

         const result = await get_all_courses_service();

         

         if(result.length === 0){
            return res.status(204).json({
                message :"Course Bucket is Empty"
            })
         }

         return res.status(200).json({  
            message : "Data Fetched Successfully",
            data : result
         })

    }
    catch(er){

        return res.status(500).json({
            message : `Internal Server Error , ${er.message}`
        })
         
    }
}