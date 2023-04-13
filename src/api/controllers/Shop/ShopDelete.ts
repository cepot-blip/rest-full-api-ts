import { Request, Response } from "express"
import { ShopModels } from "../../../models/Models";
/**
 * @function ShopDelete ini digunakan untuk menghapus toko
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @function checkUniqueId ini digunakan untuk mengecek apakah id toko ada atau tidak
 * @returns mengembalikan data yang baru saja dihapus
 * @function deleteShop ini digunakan untuk menampung data yang telah dihapus
 * 
 * @author cepot-blip
 */

export const ShopDelete = async (req: Request, res: Response) => {
    try {
        const { id } = await req.body
        const checkUniqueId = await ShopModels.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!checkUniqueId) {
            return res.status(404).json({
                success: false,
                msg: "Shop Id not found!"
            })
        }

        await ShopModels.delete({
            where: {
                id: parseInt(id)
            }
        })

        return res.status(200).json({
            success: true,
            msg: "Shop deleted successfully!",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}