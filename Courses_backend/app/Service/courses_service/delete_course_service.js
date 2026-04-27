import course_model from "../../../global/mongoDB/mongo_db_schema's/courses_related/courses_schema.js";
import topic_model from "../../../global/mongoDB/mongo_db_schema's/courses_related/topic_schema.js";

export const delete_course_service = async(course_id)=>{

    try{
        const course = await course_model.findById(course_id);

        if(!course){
            throw new Error('Course not found');
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