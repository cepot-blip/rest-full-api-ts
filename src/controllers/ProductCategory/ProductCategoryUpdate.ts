import { Response, Request } from "express"
import { ProductCategoryModels } from '../../models/Models';



export const ProductCategoryUpdate = async (req : Request, res : Response) => {
    try {
        const data = await req.body
        const { id } = await req.params

        const checkUniqueId = await ProductCategoryModels.findUnique({
            where: {
                id: parseInt(id),
            }
        })

        if (!checkUniqueId) {
            return res.status(404).json({
                success: false,
                msg: "Id not found!"
            })
        }

        const result = await ProductCategoryModels.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name: data.name,
                description: data.description,
                icon: data.icon,
                aggregate: parseInt(data.aggregate)
            }
        })

        res.status(200).json({
            success: true,
            msg: "Successfully update product category!"
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}