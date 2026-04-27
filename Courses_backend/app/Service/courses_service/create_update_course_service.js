import course_model from "../../../global/mongoDB/mongo_db_schema's/courses_related/courses_schema.js";


export const create_course_service = async(course_name , course_description )=>{
     
    try{

        const check_course = await course_model.findOne({course_name : course_name});

        if(check_course){
            throw new Error('Course with the same name already exists');
        }
        const new_course = new course_model({
            course_name : course_name,
            course_description : course_description,
            course_topics : [],
           
        })
        await new_course.save();

        return new_course;

    }
    catch(er){
        throw er;
    }
}


export const update_course_service = async(course_id, course_name, course_description)=>{
      
    try{

            const course = await course_model.findById(course_id);

            if(!course){
                throw new Error('Course not found');
            }
            course.course_name = course_name || course.course_name;
            course.course_description = course_description || course.course_description;
            await course.save();

            return course;
          
        
    }
    catch(er){
        throw er;
    }

}

