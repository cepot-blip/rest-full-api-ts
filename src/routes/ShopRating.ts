import express from "express"
import { ShopRatingCreate, ShopRatingReadAll, ShopRatingUpdate, ShopRatingDelete } from '../controllers/ShopRating';


const ShopRatingRoutes = express.Router()

//      CREATE SHOP RATING ROUTES
ShopRatingRoutes.post("/shop-rating/create", ShopRatingCreate)
ShopRatingRoutes.post("/shop-rating/read", ShopRatingReadAll)
ShopRatingRoutes.put("/shop-rating/update/:id", ShopRatingUpdate)
ShopRatingRoutes.delete("/shop-rating/delete", ShopRatingDelete)


export default ShopRatingRoutes