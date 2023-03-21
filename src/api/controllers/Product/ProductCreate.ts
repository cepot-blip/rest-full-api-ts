import { Response, Request } from "express"
import { ProductModels } from '../../../models/Models'

/**
 * @function ProductCreate ini digunakan untuk membuat product
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @returns mengembalikan data yang baru saja dibuat
 * @function result ini digunakan untuk menampung data yang telah dibuat
 * 
 * @author cepot-blip
 */

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