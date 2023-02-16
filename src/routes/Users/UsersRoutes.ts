import express from "express"
import { rateLimit } from "express-rate-limit"
import { AdminCreate } from '../../controllers/Admin/AdminCreate';
import { AdminLogin } from '../../controllers/Admin/AdminLogin';
import { AdminRead } from '../../controllers/Admin/AdminRead';
import { AdminUpdate } from '../../controllers/Admin/AdminUpdate';
import { AdminDelete } from '../../controllers/Admin/AdminDelete';
import { AdminAuth } from '../../controllers/Admin/AdminAuth';

export const UsersRoutes = express.Router()

const LimitLogin = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 10,
	standardHeaders: true,
	legacyHeaders: false,
	message: "Pressing the screen too much, please wait a little longer up to 15 minutes !!",
})

//      CREATE USER ROUTES
UsersRoutes.post("/admin/create", AdminCreate)
UsersRoutes.post("/admin/login", AdminLogin, LimitLogin)
UsersRoutes.post("/admin/read", AdminRead)
UsersRoutes.put("/admin/update/:id", AdminUpdate)
UsersRoutes.delete("/admin/delete", AdminDelete)
UsersRoutes.get("/admin/auth", AdminAuth)

export default UsersRoutes                             