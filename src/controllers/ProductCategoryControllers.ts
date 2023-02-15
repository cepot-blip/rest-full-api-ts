import { Response, Request } from "express"
import { ProductCategoryModels } from '../models/Models';


// 			CREATE PRODUCT CATEGORY
export const ProductCategoryCreate = async (req : Request, res : Response) => {
    try {
        const {
            name,
            description,
            icon,
            aggregate
        } = await req.body

        const result = await ProductCategoryModels.create({
            data: {
                name: name,
                description: description,
                icon: icon,
                aggregate: parseInt(aggregate)
            }
        })

        res.status(201).json({
            success: true,
            msg: "Successfully create product category!",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}


//      READ ALL PRODUCT
export const ProductCategoryRead = async (req: Request, res: Response) => {
    try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const skip = (page - 1) * limit;
            const filter = req.body.filter ?? {};
            const result = await ProductCategoryModels.findMany({
                skip: skip,
                take: limit,
                orderBy: { id: 'desc' },
                where: filter,
            });
        
            const conn = await ProductCategoryModels.count();
        
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


//      UPDATE PRODUCT CATEGORY
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

        const result = await ProductCategoryModels.update({
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


//      DELETE PRODUCT CATEGORY
export const ProductCategoryDelete = async (req : Request, res : Response) => {
    try {
        const { id } = await req.body
        const checkUniqueId = await ProductCategoryModels.findUnique({
            where: {
                id: parseInt(id),
            }
        })

        if (!checkUniqueId) {
            return res.status(404).json({
                success: false,
                msg: "Product category not found!"
            })
        }

        const result = await ProductCategoryModels.delete({
            where: {
                id: parseInt(id)
            }
        })

        res.status(200).json({
            success: true,
            msg: "Successfully delete product category!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}