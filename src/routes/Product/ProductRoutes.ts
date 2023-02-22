import express from "express"
import { ProductCreate } from '../../controllers/Product/ProductCreate';
import { ProductRead } from '../../controllers/Product/ProductRead';
import { ProductReadById } from '../../controllers/Product/ProductReadById';
import { ProductGetList } from '../../controllers/Product/ProductList';
import { ProductUpdate } from '../../controllers/Product/ProductUpdate';
import { ProductDelete } from '../../controllers/Product/ProductDelete';

const ProductRoutes = express.Router()

//      CREATE PRODUCT ROUTES
ProductRoutes.post("/product/create", ProductCreate)
ProductRoutes.post("/product/read", ProductRead)
ProductRoutes.get("/product/read/:id", ProductReadById)
ProductRoutes.post("/product/read-list/:id", ProductGetList)
ProductRoutes.put("/product/update/:id", ProductUpdate)
ProductRoutes.delete("/product/delete", ProductDelete)


export default ProductRoutes