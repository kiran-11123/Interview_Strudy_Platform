import { CreateFavouriteService ,DeleteFavouriteService } from "../../Service/favourites_service/get_create_favourties_service.js";

export const CreateFavouriteController = async(req , res)=>{
     
    try{

        const user_id = req.user.user_id;

        const {title , description} = req.body;

        if(!title || !description) {
            return res.status(400).json({
                message : 'Input is empty'
            })
        }

        const result  = await CreateFavouriteService(title  , description , user_id)


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

        const {fav_id}  =req.params;
        const user_id = req.user.user_id;

        const result = await DeleteFavouriteService(user_id ,fav_id);

        return res.status(200).json({
            message :"Removed from favourites"
        })

    }

    catch(er){

        if(er.message === 'Favourite not found or already deleted'){
            return res.status(400).json({
                message : 'Favourite not found or already deleted'
            })
        }

        return res.status(500).json({
            message :'Internal server error '
        })
         
    }
}