import express from "express"
import { ShopRatingCreate } from '../../controllers/ShopRating/ShopRatingCreate';
import { ShopRatingReadAll } from '../../controllers/ShopRating/ShopRatingRead';
import { ShopRatingUpdate } from '../../controllers/ShopRating/ShopRatingUpdate';
import { ShopRatingDelete } from '../../controllers/ShopRating/ShopRatingDelete';

const ShopRatingRoutes = express.Router()

//      CREATE SHOP RATING ROUTES
ShopRatingRoutes.post("/shop-rating/create", ShopRatingCreate)
ShopRatingRoutes.post("/shop-rating/read", ShopRatingReadAll)
ShopRatingRoutes.put("/shop-rating/update/:id", ShopRatingUpdate)
ShopRatingRoutes.delete("/shop-rating/delete", ShopRatingDelete)


export default ShopRatingRoutes