import express from "express"
import { MainBannerCreate } from '../../controllers/MainBanner/MainBannerCreate';
import { MainBannerRead } from '../../controllers/MainBanner/MainBannerRead';
import { MainBannerUpdate } from '../../controllers/MainBanner/MainBannerUpdate';
import { MainBannerDelete } from '../../controllers/MainBanner/MainBannerDelete';


const MainBannerRoutes = express.Router()


//      CREATE MAIN BANNER ROUTES
MainBannerRoutes.post("/main-banner/create", MainBannerCreate)
MainBannerRoutes.post("/main-banner/read", MainBannerRead)
MainBannerRoutes.put("/main-banner/update/:id", MainBannerUpdate)
MainBannerRoutes.delete("/main-banner/delete", MainBannerDelete)



export default MainBannerRoutes

