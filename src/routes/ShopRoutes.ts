import express from "express"
import { ShopCreate, ShopDelete, ShopRead, ShopReadById, ShopUpdate } from "../controllers/ShopControllers"

const ShopRoutes = express.Router()


//      CREATE SHOP ROUTES
ShopRoutes.post("/shop/create", ShopCreate)
ShopRoutes.post("/shop/read", ShopRead)
ShopRoutes.get("/shop/read/:id", ShopReadById)
ShopRoutes.put("/shop/update/:id", ShopUpdate)
ShopRoutes.delete("/shop/delete", ShopDelete)


export default ShopRoutes