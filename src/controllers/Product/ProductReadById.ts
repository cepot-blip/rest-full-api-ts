import { Response, Request } from "express"
import { ProductModels } from "../../models/Models"


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