import express from "express"
import count_read from "../controllers/CountControllers"

const CountRoutes = express.Router()

CountRoutes.get("/count", count_read)
export default CountRoutes