import mongoose from "mongoose";
import favourties_model from "../../../global/mongoDB/mongo_db_schema's/courses_related/favourites_schema.js";

export const CreateFavouriteService = async(title , description , user_id)=>{

      const session = await mongoose.startSession();
    try{

        session.startTransaction();
        
         const existing = await favourties_model.findOne(
            { title, user_id },
            null,
            { session }
        );

        if (existing) {
            throw new Error("Already added to favourites");
        }

  const newFav = new favourties_model({
            title,
            description,
            user_id
        });

        await newFav.save({ session });

        await session.commitTransaction();
        session.endSession();

        return true;

    }
    catch(er){
         await session.abortTransaction();
        session.endSession();
        throw err;
    }
     
}


export const DeleteFavouriteService = async (user_id, fav_id) => {

    
    try {

        const new_fav_id=  new mongoose.Types.ObjectId(fav_id)
        const result = await favourties_model.deleteOne({
            _id: new_fav_id,
            user_id: user_id
        });

        if (result.deletedCount === 0) {
            throw new Error("Favourite not found or already deleted");
        }

        return true;
    } catch (err) {
        throw err;
    }
};

export const GetFavouritesService = async(user_id)=>{
    try{

        const find_favourites = await favourties_model.find({user_id : user_id})

        return find_favourites

    }
    catch(er){
        throw er;
    }
}