import { Response, Request } from "express"
import { ProductModels } from "../../models/Models"


export const ProductCreate = async (req : Request, res : Response) => {
    try {
        const {
            category_id,
            shop_id,
            name,
            price,
            description,
            images
        } = await req.body

        const result = await ProductModels.create({
            data: {
                category_id: parseInt(category_id),
                shop_id: parseInt(shop_id),
                name: name,
                price: parseFloat(price),
                description: description,
                images: images
            }
        })

        res.status(201).json({
            success: true,
            msg: "Successfully create product!",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}