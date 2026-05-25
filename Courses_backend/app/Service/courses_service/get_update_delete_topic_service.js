import mongoose, { mongo } from "mongoose";
import redis_client from "../../../../redis/index.js";
import course_model from "../../../global/mongoDB/mongo_db_schema's/courses_related/courses_schema.js";
import topic_model from "../../../global/mongoDB/mongo_db_schema's/courses_related/topic_schema.js";



export const create_topic_course_service = async(course_id , topic_name , topic_description)=>{
   
       
    try{

         const course_id_new = new mongoose.Types.ObjectId(course_id);
        
         const find_topic = await topic_model.findOne({topic_name : topic_name});

         if(find_topic){
            throw new Error('Topic Name already present')
         }

         const new_topic = await topic_model.create({
             course_id : course_id_new,
             topic_name : topic_name,
             topic_description : topic_description
         })

         const check_course = await course_model.findById(course_id_new);
         
         if(!check_course){
             throw new Error('Course not found');
         }

         check_course.course_topics.push({
             topic_id : new_topic._id,
             topic_name : new_topic.topic_name
         });
         await check_course.save();
  

         const cache_course_topics = `course:${course_id}_topics`
         try{
             await redis_client.del(cache_course_topics);
         }
         catch(er){
             console.error(`Error while deleting course_topics in redis with id ${course_id} `)
         }

         return new_topic;


    }
    catch(er){
        throw er
    }
     

}

export const get_topics_course_service = async(course_id)=>{
      
    try{

        const course_id_new = new mongoose.Types.ObjectId(course_id);


        const check_course = await course_model.findById(course_id_new);

        if(!check_course){
            throw new Error('Course not found');
        }

        const cache_course_topics = `course:${course_id}_topics`

        try{

            const check_cache_course_topics = await redis_client.get(cache_course_topics);

            if(check_cache_course_topics){
                 return JSON.parse(check_cache_course_topics);
            }
            

        }
        catch(er){
            console.error(`Error while getting course_topics in redis with id ${course_id} `) 
        }

        const get_data = await course_model.findById(course_id_new).populate('course_topics');

        if(!get_data){
            throw new Error('Course not found');
        }

        try{
            await redis_client.set(cache_course_topics , JSON.stringify(get_data.course_topics) , {
                EX : 3600
            })

        }
        catch(er){
            console.error(`Error while setting course_topics in redis with id ${course_id} `)
        }


        return get_data.course_topics;


    }
    catch(er){
         throw er;
    }
}



export const update_topic_course_service = async(course_id , topic_id , topic_name , topic_description )=>{

    try{

          const course_id_new = new mongoose.Types.ObjectId(course_id);
        const check_course = await course_model.findById(course_id_new);
      


        if(!check_course){
            throw new Error('Course not found');
        }
        const topic_id_obj = new mongoose.Types.ObjectId(topic_id);
        const topic_index = check_course.course_topics.findIndex(topic => topic.topic_id.toString() === topic_id_obj.toString());
        if(topic_index === -1){
            throw new Error('Topic not found in the course');
        }
        
        const topic = await topic_model.findById(topic_id_obj);
        topic.topic_name = topic_name || topic.topic_name;
        topic.topic_description = topic_description || topic.topic_description;
        await topic.save();
        
        check_course.course_topics[topic_index].topic_name = topic.topic_name;
        await check_course.save();

        const cache_course_topics = `course:${course_id}_topics`
        try{
            await redis_client.del(cache_course_topics);
        }   
        catch(er){
            console.error(`Error while deleting course_topics in redis with id ${course_id} `)
        }

        return topic;

    }

    catch(er){
        throw er;
    }   

}



export const delete_topics_course_service = async(course_id ,topic_id)=>{
     
    try{

        const course_id_new = new mongoose.Types.ObjectId(course_id);

        const check_course  = await course_model.findById(course_id_new);

        if(!check_course){
            throw new Error ('course not found');
        }

        const topic_id_obj = new mongoose.Types.ObjectId(topic_id);

        const topic_index = check_course.course_topics.findIndex(topic => topic.topic_id.toString() === topic_id_obj.toString());

        if(topic_index === -1){
            throw new Error('Topic not found in the course');
        }

        const topic = await topic_model.findById(topic_id_obj);
        await topic_model.deleteOne({_id: topic_id_obj});

        check_course.course_topics.splice(topic_index , 1);

        await check_course.save();
        
        const cache_course_topics = `course:${course_id}_topics`
        try{
            await redis_client.del(cache_course_topics);
        }
        catch(er){
            console.error(`Error while deleting course_topics in redis with id ${course_id} `)
        }
        
        return topic;

    }
    catch(er){
         throw er;
    }
}



export const delete_all_topics_course_service = async(course_id)=>{

    try{

        const course_id_new =new  mongoose.Types.ObjectId(course_id);

        const check_course  = await course_model.findById(course_id_new);

        

        if(!check_course){
            throw new Error ('course not found');
        }



        await topic_model.deleteMany({course_id : course_id_new });

        check_course.course_topics = [];
        await check_course.save();
        const cache_course_topics = `course:${course_id}_topics`
        try{
            await redis_client.del(cache_course_topics);
        }
        catch(er){
            console.error(`Error while deleting course_topics in redis with id ${course_id} `)
        }
    }
    catch(er){
        throw er;
    }   


}