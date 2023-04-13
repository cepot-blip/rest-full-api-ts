import { Response, Request } from "express"
import { ProductCategoryModels } from "../../../models/Models";
/**
 * @function ProductCategoryCreate ini digunakan untuk membuat kategori produk  
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @returns mengembalikan data yang baru saja dibuat
 * @function result ini digunakan untuk menampung data yang telah dibuat
 * 
 * @author cepot-blip
*/

export const ProductCategoryCreate = async (req : Request, res : Response) => {
    try {
        const {
            name,
            description,
            icon,
            aggregate
        } = await req.body

        await ProductCategoryModels.create({
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