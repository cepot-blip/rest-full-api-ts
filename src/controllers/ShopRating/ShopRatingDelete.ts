import { Request, Response } from "express"
import { ShopRatingModels } from '../../models/Models';


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