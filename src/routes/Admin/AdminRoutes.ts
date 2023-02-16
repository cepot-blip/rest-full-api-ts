import express from "express"
import { rateLimit } from "express-rate-limit"
import { AdminCreate } from "../../controllers/Admin/AdminCreate";
import { AdminAuth } from "../../controllers/Admin/AdminAuth";
import { AdminDelete } from "../../controllers/Admin/AdminDelete";
import { AdminUpdate } from "../../controllers/Admin/AdminUpdate";
import { AdminLogin } from '../../controllers/Admin/AdminLogin';
import { AdminRead } from '../../controllers/Admin/AdminRead';
export const AdminRoutes = express.Router()

const LimitLogin = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 10,
	standardHeaders: true,
	legacyHeaders: false,
	message: "Pressing the screen too much, please wait a little longer up to 15 minutes !!",
})

//      CREATE USER ROUTES
AdminRoutes.post("/admin/create", AdminCreate)
AdminRoutes.post("/admin/login", AdminLogin, LimitLogin)
AdminRoutes.post("/admin/read", AdminRead)
AdminRoutes.put("/admin/update/:id", AdminUpdate)
AdminRoutes.delete("/admin/delete", AdminDelete)
AdminRoutes.get("/admin/auth", AdminAuth)

export default AdminRoutes                             