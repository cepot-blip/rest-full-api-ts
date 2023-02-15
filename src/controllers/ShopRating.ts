import { Request, Response } from "express"
import { ShopRatingModels } from '../models/Models';


export const ShopRatingCreate = async (req : Request, res : Response) => {
    try {
        const {
            shop_id,
            user_id,
            rating,
            comment
        } = await req.body

        const checkUniqueShopId = await ShopRatingModels.findFirst({
            where : {
                id : parseInt(shop_id)
            }
        })

        const checkUniqueUserId = await ShopRatingModels.findFirst({
            where : {
                id : parseInt(user_id)
            }
        })


        if(checkUniqueShopId){
            return res.status(404).json({
                success : false,
                msg : "Shop Id not found!"
            })
        }

        if(checkUniqueUserId){
            return res.status(404).json({
                success : false,
                msg : "User Id not found!"
            })
        }

        const result = await ShopRatingModels.create({
            data: {
                shop_id: parseInt(shop_id),
                user_id: parseInt(user_id),
                rating: parseInt(rating),
                comment: comment
            }
        })

        res.status(200).json({
            success: true,
            msg: "Successfully create shop rating!",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}


// 			READ ALL SHOP RATING
export const ShopRatingReadAll = async (req : Request, res : Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;
        const filter = req.body.filter ?? {};
        const result = await ShopRatingModels.findMany({
          skip: skip,
          take: limit,
          orderBy: { id: 'desc' },
          where: filter,
          include : {
            Users : {
                select : {
                    id : true,
                    name : true,
                    email : true,
                    phone : true,
                    address : true,
                    avatar : true,
                    gender : true,
                }
            },
            Shop : {
                select : {
                    id : true,
                    name : true,
                    description : true,
                    phone : true,
                    address : true,
                    icon : true,
                    verified : true,
                    longitude : true,
                    latitude : true,
                    instagram : true,
                    facebook : true,
                    website : true,
                }
            }
        }
    });
    
        const conn = await ShopRatingModels.count();
    
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


//      UPDATE SHOP RATING
export const ShopRatingUpdate = async (req : Request, res : Response) => {
    try {
        const {id} = await req.params
        const {
            shop_id,
            user_id,
            rating,
            comment
        } = await req.body

        const checkUniqueId = await ShopRatingModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        const checkUniqueUserId = await ShopRatingModels.findFirst({
            where : {
                id : parseInt(user_id)
            }
        })

        const checkUniqueShopId = await ShopRatingModels.findFirst({
            where : {
                id : parseInt(shop_id)
            }
        })

        if(!checkUniqueId){
            return res.status(404).json({
                success : false,
                msg : "Id Not Found!"
            })
        }

        if(checkUniqueUserId){
            return res.status(404).json({
                success : false,
                msg : "User Id not found!"
            })
        }

        if(checkUniqueShopId){
            return res.status(404).json({
                success : false,
                msg : "Shop Id not found!"
            })
        }

        const result = await ShopRatingModels.update({
            where : {
                id : parseInt(id)
            },
            data : {
                shop_id : parseInt(shop_id),
                user_id : parseInt(user_id),
                rating : parseInt(rating),
                comment : comment
            }
        })

        return res.status(200).json({
            success : true,
            msg : "Shop rating updated successfully!",
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}


//      DELETE SHOP RATING
export const ShopRatingDelete = async (req : Request, res : Response) => {
    try {
        const { id } = await req.params
        const checkUniqueId = await ShopRatingModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if(!checkUniqueId){
            return res.status(404).json({
                success : false,
                msg : "Id Not Found!"
            })
        }

        const result = await ShopRatingModels.delete({
            where : {
                id : parseInt(id)
            }
        })

        return res.status(200).json({
            success : true,
            msg : "Shop rating deleted successfully!",
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}