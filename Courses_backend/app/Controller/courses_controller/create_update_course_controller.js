import { create_course_service , update_course_service } from "../../Service/courses_service/create_update_course_service.js";



export const create_course_controller = async(req , res)=>{
      
    try{

        const {course_name , course_description} = req.body;

        if(!course_name || !course_description) {
            return res.status(400).json({
                message : "Inputs not valid"
            })
        }

        const result = await create_course_service(course_name , course_description);

        return res.status(200).json({
            message : 'Course Created Successfully.'
        })


    }
    catch(er){

        if(er.message === 'Course with the same name already exists'){
             
            return res.status(400).json({
                message : "Course with the same name already exists"
            })
    
        }
        return res.status(500).json({
            message : 'Internal Server Error'
        }) 
    }
}


export const update_course_controller = async(req,res)=>{
      
    try{

        const course_id = req.params.course_id;
        const { course_name , course_description} = req.body;

        if(!course_id || !course_name || !course_description){
            return res.status(400).json({
                message :"Invalid Inputs"
            })
        }

        const result = update_course_service(course_id , course_name , course_description);

        return res.status(200).json({
            message  : "Course Updated Successfully"
        })


    }
    catch(er){

        if(er.message ===  'Course not found'){
            return res.status(400).json({
                message : "Course not found"
            })
        }

        return res.status(500).json({
            message : "Internal Server Error"
        })

    }
}