import { Request, Response } from "express"
import { ShopModels } from '../../models/Models';

/**
 * @function ShopCreate ini digunakan untuk membuat toko
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @function checkUniqueUserId ini digunakan untuk mengecek apakah user sudah memiliki toko atau belum
 * @returns mengembalikan data yang baru saja dibuat
 * @function createShop ini digunakan untuk menampung data yang telah dibuat
 * 
 * @author cepot-blip
 */

export const ShopCreate = async (req : Request, res : Response) => {
    try {
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

        const checkUniqueUserId = await ShopModels.findFirst({
            where: {
                user_id: parseInt(user_id)
            }
        })

        if (checkUniqueUserId) {
            return res.status(406).json({
                success: false,
                msg: "User already have store!"
            })
        }

        const createShop = await ShopModels.create({
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
                website: website,
            }
        })

        return res.status(200).json({
            success: true,
            msg: "Shop created successfully!",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}