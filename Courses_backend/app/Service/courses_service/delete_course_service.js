import redis_client from "../../../../redis/index.js";
import course_model from "../../../global/mongoDB/mongo_db_schema's/courses_related/courses_schema.js";
import topic_model from "../../../global/mongoDB/mongo_db_schema's/courses_related/topic_schema.js";

export const delete_course_service = async(course_id)=>{

    try{
         
        const cached_course = await redis_client.get(`course:${course_id}`);

        if(cached_course){
            await redis_client.del(`course:${course_id}`);
        }


        const course = await course_model.findById(course_id);

        if(!course){
            throw new Error('Course not found');
        }

        const cache_course_topics = `course:${course_id}_topics`

        try{

            const check_cache_course_topics = await redis_client.get(cache_course_topics);

            if(check_cache_course_topics){
                 await redis_client.del(cache_course_topics);
            }

        }
        catch(er){
            console.error(`Error while deleting the topic of the course id ${course_id}`)
        }

        if(course.course_topics && course.course_topics.length > 0){
            const topic_ids = course.course_topics.map(topic => topic._id);
            await topic_model.deleteMany({_id : {$in : topic_ids}});
        }

        await course.remove();

        return course;
    }
    catch(er){
        throw er;
    }
}