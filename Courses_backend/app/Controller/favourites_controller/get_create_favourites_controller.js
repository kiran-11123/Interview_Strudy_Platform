

export const CreateFavouriteController = async(req , res)=>{
     
    try{

        const user_id = req.user.user_id;

        const {title , description} = req.body;

        const result  = await CreateFavouriteService(title  , description , user_id)


        return res.status(200).json({
            message : 'Added to Favourites'
        })
        

    }
    catch(er){
         
    }
}