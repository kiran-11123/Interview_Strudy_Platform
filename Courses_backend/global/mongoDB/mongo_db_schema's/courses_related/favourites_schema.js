import mongoose from 'mongoose'


const Favourites_schema = new mongoose.Schema({

    title : {type:String , required : true},
    description : {type : String  , required : true} , 
    user_id : {type :Number , required : true},
expiresOn: {
  type: Date,
  default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
}

}) 


const favourties_model =mongoose.model('favourites' , Favourites_schema);


export default favourties_model;