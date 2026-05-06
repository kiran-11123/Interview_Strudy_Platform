import course_model from "../../../global/mongoDB/mongo_db_schema's/courses_related/courses_schema.js";
import redis_client from "../../../../redis/index.js";
import mongoose from "mongoose";



export const get_course_service = async(course_id)=>{
      
    try{

        const cache_key = `course:${course_id}`;

        
        const new_course_id = new mongoose.Types.ObjectId(course_id);

         try{

            const cached_course = await redis_client.get(cache_key);

            if(cached_course){
                return JSON.parse(cached_course);
            }


         }
         catch(er){
            console.error('Error fetching from Redis:', er);
         }

        const course = await course_model.findById(new_course_id).populate('course_topics');

        if(!course){
            throw new Error('Course not found');
        }

        try{

            await redis_client.set(cache_key , JSON.stringify(course) , {
                EX : 3600
            })

        }
        catch(er){
            console.error('Error setting cache in Redis:', er);
        }



        return course;

    }
    catch(er){
        throw er;
    }
}


export const get_all_courses_service = async()=>{

    try{


        const cache_key = `all_courses`;

            try{
                 const cached_courses = await redis_client.get(cache_key);

                if(cached_courses){
                    return JSON.parse(cached_courses);
                }

            }
            catch(er){
                console.error('Error fetching from Redis:', er);
            }


        const courses = await course_model.find().populate('course_topics');
       
       

       
      


        try{

            await redis_client.set(cache_key , JSON.stringify(courses) , {
                EX : 3600
            })  

        }
        catch(er){
                console.error('Error setting cache in Redis:', er);
        }
        return courses;



    }
    catch(er){
         
        throw er;
    }

}