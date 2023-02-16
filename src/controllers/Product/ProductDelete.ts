import { Response, Request } from "express"
import { ProductModels } from "../../models/Models"


export const ProductDelete = async (req : Request, res : Response) => {
    try {
        const { id } = await req.body
        const checkUniqueId = await ProductModels.findUnique({
            where: {
                id: parseInt(id),
            }
        })

        if (!checkUniqueId) {
            return res.status(404).json({
                success: false,
                msg: "Product not found!"
            })
        }

        const result = await ProductModels.delete({
            where: {
                id: parseInt(id)
            }
        })

        res.status(200).json({
            success: true,
            msg: "Successfully delete product!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}