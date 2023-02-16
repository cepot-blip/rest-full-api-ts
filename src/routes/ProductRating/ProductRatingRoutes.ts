import express from "express"
import { ProductRatingCreate } from '../../controllers/ProductRating/ProductRatingCreate';
import { ProductRatingRead } from '../../controllers/ProductRating/ProductRatingRead';
import { ProductRatingUpdate } from '../../controllers/ProductRating/ProductRatingUpdate';
import { ProductRatingDelete } from '../../controllers/ProductRating/ProductRatingDelete';

export const ProductRatingRoutes = express.Router()

//      CREATE PRODUCT RATING ROUTES
ProductRatingRoutes.post("/product-rating/create", ProductRatingCreate)
ProductRatingRoutes.post("/product-rating/read", ProductRatingRead)
ProductRatingRoutes.put("/product-rating/update/:id", ProductRatingUpdate)
ProductRatingRoutes.delete("/product-rating/delete", ProductRatingDelete)


export default ProductRatingRoutes