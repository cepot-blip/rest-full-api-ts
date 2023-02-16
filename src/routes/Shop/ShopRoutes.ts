import express from "express"
import { ShopCreate } from '../../controllers/Shop/ShopCreate';
import { ShopRead } from '../../controllers/Shop/ShopRead';
import { ShopReadById } from '../../controllers/Shop/ShopReadById';
import { ShopUpdate } from '../../controllers/Shop/ShopUpdate';
import { ShopDelete } from '../../controllers/Shop/ShopDelete';

export const ShopRoutes = express.Router()


//      CREATE SHOP ROUTES
ShopRoutes.post("/shop/create", ShopCreate)
ShopRoutes.post("/shop/read", ShopRead)
ShopRoutes.get("/shop/read/:id", ShopReadById)
ShopRoutes.put("/shop/update/:id", ShopUpdate)
ShopRoutes.delete("/shop/delete", ShopDelete)


export default ShopRoutes