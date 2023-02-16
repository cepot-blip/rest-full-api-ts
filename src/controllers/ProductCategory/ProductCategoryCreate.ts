import { Response, Request } from "express"
import { ProductCategoryModels } from '../../models/Models';


export const ProductCategoryCreate = async (req : Request, res : Response) => {
    try {
        const {
            name,
            description,
            icon,
            aggregate
        } = await req.body

        const result = await ProductCategoryModels.create({
            data: {
                name: name,
                description: description,
                icon: icon,
                aggregate: parseInt(aggregate)
            }
        })

        res.status(201).json({
            success: true,
            msg: "Successfully create product category!",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}