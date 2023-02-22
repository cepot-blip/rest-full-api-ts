import { Response, Request } from "express"
import { ProductModels } from "../../models/Models"

/**
 * @function ProductReadById ini digunakan untuk membaca product berdasarkan id
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @returns mengembalikan data yang baru saja dibaca
 * @function result ini digunakan untuk menampung data yang telah dibaca
 * @function removePass ini digunakan untuk menghapus password dari data yang telah dibaca 
 * 
 * @author cepot-blip
*/

export const ProductReadById = async (req : Request, res : Response) => {
    try {
        const { id } = await req.params
        const result = await ProductModels.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                Shop: {
                    include: {
                        Users: true,
                    }
                },
                _count: true
            },


        })

        if (!result) {
            return res.status(404).json({
                success: false,
                msg: "Product not found!"
            })
        }

        const removePass = delete result.Shop.Users.password

        res.status(200).json({
            success: true,
            query: result,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}