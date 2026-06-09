import express from 'express'
const Favourites_Router =  express.Router();
import { Authentication_middleware } from '../../middleware/Authentication_middleware.js';
import { CreateFavouriteController , DeleteFavouritesController } from '../../Controller/favourites_controller/get_create_favourites_controller.js';

Favourites_Router.post('/create' , Authentication_middleware , CreateFavouriteController)
Favourites_Router.delete('/delete/:fav_id ', Authentication_middleware , DeleteFavouritesController)

export default Favourites_Router;