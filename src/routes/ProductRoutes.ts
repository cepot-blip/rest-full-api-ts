import express from "express"
import { ProductCreate, ProductDelete, ProductGetList, ProductRead, ProductReadById, ProductUpdate } from "../controllers/ProductControllers"

const ProductRoutes = express.Router()

//      CREATE PRODUCT ROUTES
ProductRoutes.post("/product/create", ProductCreate)
ProductRoutes.post("/product/read", ProductRead)
ProductRoutes.get("/product/read/:id", ProductReadById)
ProductRoutes.post("/product/read-list/:id", ProductGetList)
ProductRoutes.put("/product/update/:id", ProductUpdate)
ProductRoutes.delete("/product/delete", ProductDelete)


export default ProductRoutes