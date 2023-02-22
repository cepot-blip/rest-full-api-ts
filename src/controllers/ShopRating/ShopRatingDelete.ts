import { Request, Response } from "express"
import { ShopRatingModels } from '../../models/Models';

/**
 * @function ShopRatingDelete ini digunakan untuk menghapus rating toko
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @function checkUniqueId ini digunakan untuk mengecek apakah id rating toko ada atau tidak
 * @returns mengembalikan data yang baru saja dihapus
 * @function result ini digunakan untuk menampung data yang telah dihapus
 * 
 * @author cepot-blip
 */

export const ShopRatingDelete = async (req : Request, res : Response) => {
    try {
        const { id } = await req.params
        const checkUniqueId = await ShopRatingModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if(!checkUniqueId){
            return res.status(404).json({
                success : false,
                msg : "Id Not Found!"
            })
        }

        const result = await ShopRatingModels.delete({
            where : {
                id : parseInt(id)
            }
        })

        return res.status(200).json({
            success : true,
            msg : "Shop rating deleted successfully!",
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}