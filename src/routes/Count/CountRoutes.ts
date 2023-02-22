import express from "express"
import CountRead from "../../controllers/Count/CountRead"

const CountRoutes = express.Router()


//      ROUTES
CountRoutes.get("/count", CountRead)


export default CountRoutes