import express from "express"
import rateLimit  from "express-rate-limit"
import helmet from "helmet"
import cors from "cors"
import UsersRoutes from './api/routes/Users/UsersRoutes';
import AdminRoutes from './api/routes/Admin/AdminRoutes';
import ProductRoutes from './api/routes/Product/ProductRoutes';
import ProductCategoryRoutes from './api/routes/ProductCategory/ProductCategoryRoutes';
import ProductRatingRoutes from './api/routes/ProductRating/ProductRatingRoutes';
import ShopRoutes from './api/routes/Shop/ShopRoutes';
import ShopRatingRoutes from './api/routes/ShopRating/ShopRatingRoutes';
import UploaderRoutes from './api/routes/Upload/UploaderRoutes';
import CountRoutes from './api/routes/Count/CountRoutes';
import EventRoutes from './api/routes/Event/EventRoutes';
import EventPostRoutes from './api/routes/EventPosts/EventPostRoutes';
import EventPostsLikeRoutes from './api/routes/EventPostLike/EventPostLikeRoutes';
import MainBannerRoutes from './api/routes/MainBanner/MainBannerRoutes';

export const app = express()

/**
 * @function limiter ini digunakan untuk melakukan rate limit pada aplikasi
 * @param windowMs ini adalah waktu yang di tentukan untuk melakukan rate limit
 * @param max ini adalah jumlah maksimal request yang diizinkan
 * @param standardHeaders ini digunakan untuk menampilkan header pada response
 * @param legacyHeaders ini digunakan untuk menampilkan header pada response
 * @param message ini adalah pesan yang akan ditampilkan ketika melakukan rate limit
 * @function app.use ini digunakan untuk menggunakan middleware
 */


//	RATE LIMIT, THE PROCESS OF LIMITING THE NUMBER OF USER/CLIENT REQUSET ON CERTAIN RESOURCES
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, //15 minutes
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
	message: "Too much pressing the screen please wait a while longer !!",
})

//		MIDDLEWARE
app.use((req, res, next) => {
	// WEBSITE YOU WISH TO ALLOW TO CONNECT
	req.headers["Access-control-allow-origin"] = "*"

	// REQUEST METHOD YOU WISH TO ALLOW
	req.headers["Access-control-allow-methods"] = "GET, POST, PUT, DELETE, OPTIONS, PATCH"

	// REQUEST HEADERS YOU WISH TO ALLOW
	req.headers["Access-control-allow-headers"] = "Content-Type, Authorization"

	// PASS TO NEXT LAYER OF MIDDLEWARE
	next()
})

app.use(
	cors({
		origin: "*",
	})
)

app.use(
	helmet({
		crossOriginResourcePolicy: false,
	})
)

app.use(limiter)
app.use(express.json({ limit: "100mb" }))
app.use(express.urlencoded({ extended: false }))

//		ROUTES
app.use("/api", UsersRoutes)
app.use("/api", AdminRoutes)
app.use("/api", ProductRoutes)
app.use("/api", ProductCategoryRoutes)
app.use("/api", ProductRatingRoutes)
app.use("/api", ShopRoutes)
app.use("/api", ShopRatingRoutes)
app.use("/api", UploaderRoutes)
app.use("/api", CountRoutes)
app.use("/api", EventRoutes)
app.use("/api", EventPostRoutes)
app.use("/api", EventPostsLikeRoutes)
app.use("/api", MainBannerRoutes)

//		ERROR HANDLER
app.use((req, res, next) => {
    const error = new Error("Not Found!")
    res.status(404)
    next(error)
})