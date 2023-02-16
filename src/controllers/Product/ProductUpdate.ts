import { Response, Request } from "express"
import { ProductModels } from "../../models/Models"


export const ProductUpdate = async (req : Request, res : Response) => {
    try {
        const data = await req.body
        const { id } = await req.params

        const checkUniqueId = await ProductModels.findUnique({
            where: {
                id: parseInt(id),
            }
        })

        const checkUniqueCategoryId = await ProductModels.findFirst({
            where: {
                category_id: parseInt(data.category_id),
            }
        })

        const checkUniqueShopId = await ProductModels.findFirst({
            where: {
                shop_id: parseInt(data.shop_id),
            }
        })

        if (!checkUniqueId) {
            return res.status(404).json({
                success: false,
                msg: "Id not found!"
            })
        }

        if (!checkUniqueCategoryId) {
            return res.status(404).json({
                success: false,
                msg: "Category Id not found!"
            })
        }

        if (!checkUniqueShopId) {
            return res.status(404).json({
                success: false,
                msg: "Shop Id not found!"
            })
        }

        const result = await ProductModels.update({
            where: {
                id: parseInt(id)
            },
            data: {
                category_id: parseInt(data.category_id),
                shop_id: parseInt(data.shop_id),
                name: data.name,
                price: parseFloat(data.price),
                description: data.description,
                images: data.images
            }
        })

        res.status(200).json({
            success: true,
            msg: "Successfully update product!"
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}