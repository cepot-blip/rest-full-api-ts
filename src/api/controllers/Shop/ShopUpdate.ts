import { Request, Response } from "express"
import { ShopModels } from "../../../models/Models";

/**
 * @function ShopUpdate ini digunakan untuk mengupdate toko
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @function checkUniqueId ini digunakan untuk mengecek apakah id toko ada atau tidak
 * @function checkUniqueUserId ini digunakan untuk mengecek apakah user id toko ada atau tidak
 * @returns mengembalikan data yang baru saja diupdate
 * @function updateShop ini digunakan untuk menampung data yang telah diupdate
 * 
 * @author cepot-blip
*/

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
        } = await req.body

        const checkUniqueId = await ShopModels.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        const checkUniqueUserId = await ShopModels.findFirst({
            where: {
                id: parseInt(user_id)
            }
        })

        if (!checkUniqueId) {
            return res.status(404).json({
                success: false,
                msg: "Id not found!"
            })
        }

        if (checkUniqueUserId) {
            return res.status(404).json({
                success: false,
                msg: "User Id not found!"
            })
        }

        await ShopModels.update({
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
