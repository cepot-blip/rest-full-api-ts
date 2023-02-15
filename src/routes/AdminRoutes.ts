import express from "express"
import { rateLimit } from "express-rate-limit"
import { AdminAuth, AdminCreate, AdminDelete, AdminLogin, AdminRead, AdminUpdate } from "../controllers/AdminControllers"
const AdminRoutes = express.Router()

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