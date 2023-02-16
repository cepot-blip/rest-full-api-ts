import { Request, Response } from "express"
import { ShopModels } from '../../models/Models';


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

        const deleteShop = await ShopModels.delete({
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