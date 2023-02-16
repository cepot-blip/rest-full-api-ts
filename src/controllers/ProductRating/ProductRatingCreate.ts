import { Response, Request } from "express"
import { ProductRatingModels } from '../../models/Models';


export const ProductRatingCreate = async (req : Request, res : Response) => {
    try {
        const {
            product_id,
            user_id,
            rating,
            comment
        } = await req.body

        const checkUniqueProductId = await ProductRatingModels.findFirst({
            where : {
                id : parseInt(product_id)
            }
        })

        const checkUniqueUserId = await ProductRatingModels.findFirst({
            where : {
                id : parseInt(user_id)
            }
        })

        if(checkUniqueProductId){
            return res.status(404).json({
                success : false,
                msg : "Product Id not found!"
            })
        }

        if(checkUniqueUserId){
            return res.status(404).json({
                success : false,
                msg : "User Id not found!"
            })
        }


        const result = await ProductRatingModels.create({
            data: {
                product_id: parseInt(product_id),
                user_id: parseInt(user_id),
                rating: parseInt(rating),
                comment: comment
            }
        })

        res.status(201).json({
            success: true,
            msg: "Successfully create product rating!",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}