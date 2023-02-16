import { Request, Response } from "express"
import { ShopModels } from '../../models/Models';


export const ShopUpdate = async (req: Request, res: Response) => {
    try {
        const { id } = await req.params
        const {
            user_id,
            name,
            description,
            phone,
            address,
            icon,
            verified,
            longitude,
            latitude,
            instagram,
            facebook,
            website
        }= await req.body

        const checkUniqueShopId = await ShopModels.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        const checkUniqueUserId = await ShopModels.findUnique({
            where: {
                id: parseInt(user_id)
            }
        })

        if (!checkUniqueShopId) {
            return res.status(404).json({
                success: false,
                msg: "Shop Id not found!"
            })
        }

        if (!checkUniqueUserId) {
            return res.status(404).json({
                success: false,
                msg: "User Id not found!"
            })
        }

        const updateShop = await ShopModels.update({
            where: {
                id: parseInt(id)
            },
            data: {
                user_id: parseInt(user_id),
                name: name,
                description: description,
                phone: phone,
                address: address,
                icon: icon,
                verified: verified,
                longitude: longitude,
                latitude: latitude,
                instagram: instagram,
                facebook: facebook,
                website: website
            }
        })

        return res.status(200).json({
            success: true,
            msg: "Shop updated successfully!",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}
