import mongoose from "mongoose";

import topic_model from "../../../global/mongoDB/mongo_db_schema's/courses_related/topic_schema.js";

export const CreateFavouriteService = async (topic_id, user_id) => {
    try {

        const new_topic_id = new mongoose.Types.ObjectId(topic_id);
        const topic = await topic_model.findById(new_topic_id);

        if (!topic) {
            throw new Error("Topic not found");
        }

        // check if already exists
        const alreadyFavourite = topic.favourites.includes(user_id);

        if (alreadyFavourite) {
            throw new Error("Already added to favourites");
        }

        // add user safely
        await topic_model.updateOne(
            { _id: topic_id },
            { $addToSet: { favourites: user_id } }
        );

        return true;

    } catch (err) {
        throw err;
    }
}


export const DeleteFavouriteService = async (user_id, topic_id) => {
    try {

        const new_topic_id = new mongoose.Types.ObjectId(topic_id);
        const topic = await topic_model.findById(new_topic_id);

        if (!topic) {
            throw new Error("Topic not found");
        }

        await topic_model.updateOne(
            { _id: topic_id },
            { $pull: { favourites: user_id } }
        );

        return true;

    } catch (err) {
        throw err;
    }
};


export const GetFavouritesService = async (user_id) => {
    try {
        const topics = await topic_model.find({
            favourites: user_id
        });

        return topics;

    } catch (err) {
        throw err;
    }
};