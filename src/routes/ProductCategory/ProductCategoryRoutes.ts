import express from "express"
import { ProductCategoryCreate } from '../../controllers/ProductCategory/ProductCategoryCreate';
import { ProductCategoryRead } from '../../controllers/ProductCategory/ProductCategoryRead';
import { ProductCategoryUpdate } from '../../controllers/ProductCategory/ProductCategoryUpdate';
import { ProductCategoryDelete } from '../../controllers/ProductCategory/ProductCategoryDelete';

export const ProductCategoryRoutes = express.Router()

//      CREATE PRODUCT ROUTES
ProductCategoryRoutes.post("/product-category/create", ProductCategoryCreate)
ProductCategoryRoutes.post("/product-category/read", ProductCategoryRead)
ProductCategoryRoutes.put("/product-category/update/:id", ProductCategoryUpdate)
ProductCategoryRoutes.delete("/product-category/delete", ProductCategoryDelete)


export default ProductCategoryRoutes