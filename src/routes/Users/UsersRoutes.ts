import { UsersAuth } from './../../controllers/Users/UsersAuth';
import { UsersUpdate } from './../../controllers/Users/UsersUpdate';
import { UsersRead } from './../../controllers/Users/UsersRead';
import { UsersLogin } from './../../controllers/Users/UsersLogin';
import { UsersCreate } from './../../controllers/Users/UsersCreate';
import express from "express"
import { rateLimit } from "express-rate-limit"
import { UsersDelete } from '../../controllers/Users/UsersDelete';

const UsersRoutes = express.Router()

const LimitLogin = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 10,
	standardHeaders: true,
	legacyHeaders: false,
	message: "Pressing the screen too much, please wait a little longer up to 15 minutes !!",
})

//      CREATE USER ROUTES
UsersRoutes.post("/users/create", UsersCreate)
UsersRoutes.post("/users/login",LimitLogin ,UsersLogin)
UsersRoutes.post("/users/read", UsersRead)
UsersRoutes.put("/users/update/:id", UsersUpdate)
UsersRoutes.delete("/users/delete", UsersDelete)
UsersRoutes.get("/users/auth", UsersAuth)

export default UsersRoutes                             