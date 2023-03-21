import { Request, Response } from "express"
import { ShopRatingModels } from "../../../models/Models";
/**
 * @function ShopRatingUpdate ini digunakan untuk mengupdate rating toko
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @function checkUniqueId ini digunakan untuk mengecek apakah id rating toko ada atau tidak
 * @function checkUniqueUserId ini digunakan untuk mengecek apakah id user ada atau tidak
 * @function checkUniqueShopId ini digunakan untuk mengecek apakah id toko ada atau tidak
 * @returns mengembalikan data yang baru saja diupdate
 * @function result ini digunakan untuk menampung data yang telah diupdate
 * 
 * @author cepot-blip
*/

export const ShopRatingUpdate = async (req : Request, res : Response) => {
    try {
        const {id} = await req.params
        const {
            shop_id,
            user_id,
            rating,
            comment
        } = await req.body

        const checkUniqueId = await ShopRatingModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        const checkUniqueUserId = await ShopRatingModels.findFirst({
            where : {
                id : parseInt(user_id)
            }
        })

        const checkUniqueShopId = await ShopRatingModels.findFirst({
            where : {
                id : parseInt(shop_id)
            }
        })

        if(!checkUniqueId){
            return res.status(404).json({
                success : false,
                msg : "Id Not Found!"
            })
        }

        if(checkUniqueUserId){
            return res.status(404).json({
                success : false,
                msg : "User Id not found!"
            })
        }

        if(!checkUniqueShopId){
            return res.status(404).json({
                success : false,
                msg : "Shop Id not found!"
            })
        }

        const result = await ShopRatingModels.update({
            where : {
                id : parseInt(id)
            },
            data : {
                shop_id : parseInt(shop_id),
                user_id : parseInt(user_id),
                rating : parseInt(rating),
                comment : comment
            }
        })

        return res.status(200).json({
            success : true,
            msg : "Shop rating updated successfully!",
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}