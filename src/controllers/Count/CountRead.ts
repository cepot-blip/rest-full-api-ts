import { Request, Response } from "express"
import { EventModels, MainBannerModels, ProductCategoryModels, ProductModels, ShopModels, UsersModels } from "./../../models/Models"

const CountRead = async (req: Request, res: Response) => {
    try {
        const user_count = await UsersModels.count()
        const shop_count = await ShopModels.count()
        const product_count = await ProductModels.count()
        const category_count = await ProductCategoryModels.count()
        const event_count = await EventModels.count()
        const banner_count = await MainBannerModels.count()

        return res.status(200).json({
            success: true,
            query: { user_count, shop_count, product_count, category_count, event_count, banner_count }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

export default CountRead