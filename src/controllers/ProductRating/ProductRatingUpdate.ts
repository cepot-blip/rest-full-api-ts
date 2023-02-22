import { Response, Request } from "express"
import { ProductRatingModels } from '../../models/Models';

/**
 * @function ProductRatingUpdate ini digunakan untuk mengupdate rating produk
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @function checkUniqueId ini digunakan untuk mengecek apakah id yang diinput sudah ada atau belum
 * @function checkUniqueProductId ini digunakan untuk mengecek apakah product id yang diinput sudah ada atau belum
 * @function checkUniqueUserId ini digunakan untuk mengecek apakah user id yang diinput sudah ada atau belum
 * @returns mengembalikan data yang baru saja diupdate
 * @function result ini digunakan untuk menampung data yang telah diupdate
 * 
 * @author cepot-blip
 */

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