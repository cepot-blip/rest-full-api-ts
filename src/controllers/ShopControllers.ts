import { Request, Response } from "express"
import { ShopModels } from '../models/Models';


//      CREATE SHOP
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


//      READ SHOP
export const ShopRead = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;
        const filter = req.body.filter ?? {};
        const result = await ShopModels.findMany({
            skip: skip,
            take: limit,
            orderBy: { id: 'desc' },
            where: filter,
            include: {
                Users: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                _count: true
            }
        });
    
        const conn = await ShopModels.count();
    
        const totalPage = Math.ceil(conn / limit);
    
        res.status(200).json({
            success: true,
            current_page: page,
            total_page: totalPage,
            total_data: conn,
            query: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}


// SHOP READ BY ID
export const ShopReadById = async (req: Request, res: Response) => {
    try {
        const {id} = await req.params
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;
        const result = await ShopModels.findMany({
            skip: skip,
            take: limit,
            orderBy: { id: 'desc' },
            where: {
                id: parseInt(id)
            },
            include: {
                Users: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                Product: true,
                _count: true
            }
        });
    
        const conn = await ShopModels.count();
    
        const totalPage = Math.ceil(conn / limit);
    
        res.status(200).json({
            success: true,
            current_page: page,
            total_page: totalPage,
            total_data: conn,
            query: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}


//      UPDATE SHOP
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


//      SHOP DELETE
export const ShopDelete = async (req: Request, res: Response) => {
    try {
        const { id } = await req.body
        const checkUniqueId = await ShopModels.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!checkUniqueId) {
            return res.status(404).json({
                success: false,
                msg: "Shop Id not found!"
            })
        }

        const deleteShop = await ShopModels.delete({
            where: {
                id: parseInt(id)
            }
        })

        return res.status(200).json({
            success: true,
            msg: "Shop deleted successfully!",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}