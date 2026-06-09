import favourties_model from "../../../global/mongoDB/mongo_db_schema's/courses_related/favourites_schema";
import topic_model from "../../../global/mongoDB/mongo_db_schema's/courses_related/topic_schema";

export const CreateFavouriteService = async(title , description , user_id)=>{
    try{
        
        const check_title = await favourties_model.find({title :title , user_id : user_id});

        if(check_title){
            throw new Error('Already added to favourites');
        }


    }
    catch(er){
        throw er;
    }
     
}