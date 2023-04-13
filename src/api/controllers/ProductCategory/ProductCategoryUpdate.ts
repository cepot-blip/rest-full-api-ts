import { Response, Request } from "express"
import { ProductCategoryModels } from "../../../models/Models";

/**
 * @function ProductCategoryUpdate ini digunakan untuk mengupdate kategori produk   
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @function checkUniqueId ini digunakan untuk mengecek apakah id yang diinputkan ada atau tidak
 * @returns mengembalikan data yang baru saja diupdate
 * @function result ini digunakan untuk menampung data yang telah diupdate
 * 
 * @author cepot-blip
*/

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

        await ProductCategoryModels.update({
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