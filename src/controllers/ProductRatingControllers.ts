import { Response, Request } from "express"
import { ProductRatingModels } from '../models/Models';


// 			CREATE PRODUCT RATING
export const ProductRatingCreate = async (req : Request, res : Response) => {
    try {
        const {
            product_id,
            user_id,
            rating,
            comment
        } = await req.body

        const checkUniqueProductId = await ProductRatingModels.findFirst({
            where : {
                id : parseInt(product_id)
            }
        })

        const checkUniqueUserId = await ProductRatingModels.findFirst({
            where : {
                id : parseInt(user_id)
            }
        })

        if(checkUniqueProductId){
            return res.status(404).json({
                success : false,
                msg : "Product Id not found!"
            })
        }

        if(checkUniqueUserId){
            return res.status(404).json({
                success : false,
                msg : "User Id not found!"
            })
        }


        const result = await ProductRatingModels.create({
            data: {
                product_id: parseInt(product_id),
                user_id: parseInt(user_id),
                rating: parseInt(rating),
                comment: comment
            }
        })

        res.status(201).json({
            success: true,
            msg: "Successfully create product rating!",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}


//      READ ALL PRODUCT RATING
export const ProductRatingRead = async (req: Request, res: Response) => {
    try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const skip = (page - 1) * limit;
            const filter = req.body.filter ?? {};
            const result = await ProductRatingModels.findMany({
                skip: skip,
                take: limit,
                orderBy: { id: 'desc' },
                where: filter,
            });
        
            const conn = await ProductRatingModels.count();
        
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
  };


//      UPDATE PRODUCT RATING
export const ProductRatingUpdate = async (req : Request, res : Response) => {
    try {
        const {
            product_id,
            user_id,
            rating,
            comment
        } = await req.body
        const { id } = await req.params

        const checkUniqueId = await ProductRatingModels.findUnique({
            where: {
                id: parseInt(id),
            }
        })


        const checkUniqueProductId = await ProductRatingModels.findFirst({
            where : {
                id : parseInt(product_id)
            }
        })

        const checkUniqueUserId = await ProductRatingModels.findFirst({
            where : {
                id : parseInt(user_id)
            }
        })

        if(checkUniqueProductId){
            return res.status(404).json({
                success : false,
                msg : "Product Id not found!"
            })
        }

        if(checkUniqueUserId){
            return res.status(404).json({
                success : false,
                msg : "User Id not found!"
            })
        }

        if (!checkUniqueId) {
            return res.status(404).json({
                success: false,
                msg: "Id not found!"
            })
        }

        const result = await ProductRatingModels.update({
            where: {
                id: parseInt(id)
            },
            data: {
                product_id: parseInt(product_id),
                user_id: parseInt(user_id),
                rating: parseInt(rating),
                comment: comment
            }
        })

        res.status(200).json({
            success: true,
            msg: "Successfully update product rating!"
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}


//      DELETE PRODUCT RATING
export const ProductRatingDelete = async (req : Request, res : Response) => {
    try {
        const { id } = await req.body
        const checkUniqueId = await ProductRatingModels.findUnique({
            where: {
                id: parseInt(id),
            }
        })

        if (!checkUniqueId) {
            return res.status(404).json({
                success: false,
                msg: "Product rating not found!"
            })
        }

        const result = await ProductRatingModels.delete({
            where: {
                id: parseInt(id)
            }
        })

        res.status(200).json({
            success: true,
            msg: "Successfully delete product rating!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}