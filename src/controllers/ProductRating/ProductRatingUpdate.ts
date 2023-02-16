import { Response, Request } from "express"
import { ProductRatingModels } from '../../models/Models';


export const ProductRatingUpdate = async (req : Request, res : Response) => {
    try {
        const {
            product_id,
            user_id,
            rating,
            comment
        } = await req.body
        const { id } = await req.params

        const checkUniqueId = await ProductRatingModels.findUnique({
            where: {
                id: parseInt(id),
            }
        })

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

        if(!checkUniqueProductId){
            return res.status(404).json({
                success : false,
                msg : "Product Id not found!"
            })
        }

        if(!checkUniqueUserId){
            return res.status(404).json({
                success : false,
                msg : "User Id not found!"
            })
        }

        if (!checkUniqueId) {
            return res.status(404).json({
                success: false,
                msg: "Id not found!"
            })
        }

        const result = await ProductRatingModels.update({
            where: {
                id: parseInt(id)
            },
            data: {
                product_id: parseInt(product_id),
                user_id: parseInt(user_id),
                rating: parseInt(rating),
                comment: comment
            }
        })

        res.status(200).json({
            success: true,
            msg: "Successfully update product rating!"
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}