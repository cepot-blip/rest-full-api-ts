import EventPostsLikeRoutes  from './routes/EventPostLike/EventPostLikeRoutes';
import CountRoutes  from './routes/Count/CountRoutes';
import UploaderRoutes  from './routes/Upload/UploaderRoutes';
import ShopRatingRoutes  from './routes/ShopRating/ShopRatingRoutes';
import ShopRoutes  from './routes/Shop/ShopRoutes';
import ProductRatingRoutes  from './routes/ProductRating/ProductRatingRoutes';
import ProductCategoryRoutes  from './routes/ProductCategory/ProductCategoryRoutes';
import ProductRoutes  from './routes/Product/ProductRoutes';
import AdminRoutes  from './routes/Admin/AdminRoutes';
import UsersRoutes from './routes/Users/UsersRoutes';
import MainBannerRoutes  from './routes/MainBanner/MainBannerRoutes';
import EventPostRoutes  from './routes/EventPosts/EventPostRoutes';
import EventRoutes  from './routes/Event/EventRoutes';
import express from "express"
import rateLimit  from "express-rate-limit"
import helmet from "helmet"
import cors from "cors"
import env from "dotenv"
env.config()

const app = express()
const PORT = process.env.PORT

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


//		LISTENER
app.listen(PORT, () => {
	console.log(`
  
  =====================================

   L I S T E N  T O  P O R T ${PORT} :D

  =====================================
  
  `)
})
