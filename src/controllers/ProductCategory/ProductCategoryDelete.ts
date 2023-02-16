import { Response, Request } from "express"
import { ProductCategoryModels } from '../../models/Models';


export const ProductCategoryDelete = async (req : Request, res : Response) => {
    try {
        const { id } = await req.body
        const checkUniqueId = await ProductCategoryModels.findUnique({
            where: {
                id: parseInt(id),
            }
        })

        if (!checkUniqueId) {
            return res.status(404).json({
                success: false,
                msg: "Product category not found!"
            })
        }

        const result = await ProductCategoryModels.delete({
            where: {
                id: parseInt(id)
            }
        })

        res.status(200).json({
            success: true,
            msg: "Successfully delete product category!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}