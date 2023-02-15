import express from "express"
import { ProductRatingCreate, ProductRatingDelete, ProductRatingRead, ProductRatingUpdate } from "../controllers/ProductRatingControllers"

const ProductRatingRoutes = express.Router()

//      CREATE PRODUCT RATING ROUTES
ProductRatingRoutes.post("/product-rating/create", ProductRatingCreate)
ProductRatingRoutes.post("/product-rating/read", ProductRatingRead)
ProductRatingRoutes.put("/product-rating/update/:id", ProductRatingUpdate)
ProductRatingRoutes.delete("/product-rating/delete", ProductRatingDelete)


export default ProductRatingRoutes