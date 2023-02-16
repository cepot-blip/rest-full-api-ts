import { Request, Response } from "express"
import { ShopRatingModels } from '../../models/Models';


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