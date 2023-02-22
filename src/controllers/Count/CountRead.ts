import { Request, Response } from "express"
import { EventModels, MainBannerModels, ProductCategoryModels, ProductModels, ShopModels, UsersModels } from "./../../models/Models"

/**
 * @function CountRead ini digunakan untuk menghitung jumlah data dari setiap tabel
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @returns mengembalikan jumlah data dari setiap tabel
 * @function user_count ini digunakan untuk menghitung jumlah data dari tabel users
 * @function shop_count ini digunakan untuk menghitung jumlah data dari tabel shops
 * @function product_count ini digunakan untuk menghitung jumlah data dari tabel products
 * @function category_count ini digunakan untuk menghitung jumlah data dari tabel product_categories
 * @function event_count ini digunakan untuk menghitung jumlah data dari tabel events
 * @function banner_count ini digunakan untuk menghitung jumlah data dari tabel main_banners
 * 
 * @author cepot-blip
 *  */

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