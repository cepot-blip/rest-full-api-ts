import express from "express"
import { ProductCategoryCreate, ProductCategoryRead, ProductCategoryUpdate, ProductCategoryDelete } from '../controllers/ProductCategoryControllers';

const ProductCategoryRoutes = express.Router()

//      CREATE PRODUCT ROUTES
ProductCategoryRoutes.post("/product-category/create", ProductCategoryCreate)
ProductCategoryRoutes.post("/product-category/read", ProductCategoryRead)
ProductCategoryRoutes.put("/product-category/update/:id", ProductCategoryUpdate)
ProductCategoryRoutes.delete("/product-category/delete", ProductCategoryDelete)


export default ProductCategoryRoutes