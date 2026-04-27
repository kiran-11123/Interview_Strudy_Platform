import course_model from "../../../global/mongoDB/mongo_db_schema's/courses_related/courses_schema.js";




export const get_course_service = async(course_id)=>{
      
    try{

        const course = await course_model.findById(course_id);

        if(!course){
            throw new Error('Course not found');
        }

        return course;

    }
    catch(er){
        throw er;
    }
}


export const get_all_courses_service = async()=>{

    try{


        const courses = await course_model.find();
        return courses;



    }
    catch(er){
         
        throw er;
    }

}