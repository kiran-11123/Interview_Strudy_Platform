import { CreateFavouriteService ,DeleteFavouriteService , GetFavouritesService} from "../../Service/favourites_service/get_create_favourties_service.js";

export const CreateFavouriteController = async(req , res)=>{
     
    try{

        const user_id = req.user.user_id;

        const {topic_id} = req.body;

        if(!topic_id) {
            return res.status(400).json({
                message : 'Input is empty'
            })
        }

        const result  = await CreateFavouriteService(topic_id , user_id)


        return res.status(200).json({
            message : 'Added to Favourites'
        })


    }
    catch(er){

        if(er.message === 'Already added to favourites'){
            return res.status(401).json({
                message :'Already added to favourites'
            })
        }

        return res.status(500).json({
            message : 'Internal server error'
        })
         
    }
}

export const DeleteFavouritesController = async(req,res)=>{
     
    try{

        const {topic_id}  =req.params;
        const user_id = req.user.user_id;

        const result = await DeleteFavouriteService(user_id ,topic_id);

        return res.status(200).json({
            message :"Removed from favourites"
        })

    }

    catch(er){

        if(er.message === 'Topic not found'){
            return res.status(400).json({
                message : 'Topic not found'
            })
        }

        return res.status(500).json({
            message :'Internal server error '
        })
         
    }
}

export const GetFavourtiesController = async(req,res)=>{
    
    try{

        const user_id = req.user.user_id;

        const result = await GetFavouritesService(user_id);

        return res.status(200).json({
            message : 'Favourites Fetched Successfully',
            result : result
        })

    }
    catch(er){
        return res.status(500).json({
            message : 'Internal server error'
        })
    }
}