import { Request, Response } from "express"
import { ShopRatingModels } from '../../models/Models';

/**
 * @function ShopRatingCreate ini digunakan untuk membuat rating toko
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @function checkUniqueShopId ini digunakan untuk mengecek apakah id toko ada atau tidak
 * @function checkUniqueUserId ini digunakan untuk mengecek apakah id user ada atau tidak
 * @returns mengembalikan data yang baru saja dibuat
 * @function result ini digunakan untuk menampung data yang telah dibuat
 * 
 * @author cepot-blip
*/

export const ShopRatingCreate = async (req : Request, res : Response) => {
    try {
        const {
            shop_id,
            user_id,
            rating,
            comment
        } = await req.body

        const checkUniqueShopId = await ShopRatingModels.findFirst({
            where : {
                id : parseInt(shop_id)
            }
        })

        const checkUniqueUserId = await ShopRatingModels.findFirst({
            where : {
                id : parseInt(user_id)
            }
        })


        if(checkUniqueShopId){
            return res.status(404).json({
                success : false,
                msg : "Shop Id not found!"
            })
        }

        if(checkUniqueUserId){
            return res.status(404).json({
                success : false,
                msg : "User Id not found!"
            })
        }

        const result = await ShopRatingModels.create({
            data: {
                shop_id: parseInt(shop_id),
                user_id: parseInt(user_id),
                rating: parseInt(rating),
                comment: comment
            }
        })

        res.status(200).json({
            success: true,
            msg: "Successfully create shop rating!",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}