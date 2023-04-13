import { Response, Request } from "express"
import { ProductRatingModels } from "../../../models/Models";

/**
 * @function ProductRatingCreate ini digunakan untuk membuat rating produk
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @function checkUniqueProductId ini digunakan untuk mengecek apakah product id yang diinput sudah ada atau belum
 * @function checkUniqueUserId ini digunakan untuk mengecek apakah user id yang diinput sudah ada atau belum
 * @returns mengembalikan data yang baru saja dibuat
 * @function result ini digunakan untuk menampung data yang telah dibuat
 * 
 * @author cepot-blip
 */

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


        await ProductRatingModels.create({
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