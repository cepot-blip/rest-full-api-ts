import { Response, Request } from "express"
import { ProductModels } from "../models/Models"


// 			CREATE PRODUCT
export const ProductCreate = async (req : Request, res : Response) => {
    try {
        const {
            category_id,
            shop_id,
            name,
            price,
            description,
            images
        } = await req.body

        const result = await ProductModels.create({
            data: {
                category_id: parseInt(category_id),
                shop_id: parseInt(shop_id),
                name: name,
                price: parseFloat(price),
                description: description,
                images: images
            }
        })

        res.status(201).json({
            success: true,
            msg: "Successfully create product!",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}


//      READ ALL PRODUCT
export const ProductRead = async (req: Request, res: Response) => {
    try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const skip = (page - 1) * limit;
            const filter = req.body.filter ?? {};
            const result = await ProductModels.findMany({
                skip: skip,
                take: limit,
                orderBy: { id: 'desc' },
                where: filter,
            });
        
            const conn = await ProductModels.count();
        
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

//      READ PRODUCT BY ID
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


//      GET LIST PRODUCT 
export const ProductGetList = async (req : Request, res : Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;
        const filter = req.body.filter ?? {};
        const result = await ProductModels.findMany({
          skip: skip,
          take: limit,
          orderBy: { id: 'desc' },
          where: filter,
          select: {
            id: true,
            images: true,
            name: true,
            price: true,
          }
        });
    
        const conn = await ProductModels.count();
    
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

//      UPDATE PRODUCT
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


//      DELETE PRODUCT
export const ProductDelete = async (req : Request, res : Response) => {
    try {
        const { id } = await req.body
        const checkUniqueId = await ProductModels.findUnique({
            where: {
                id: parseInt(id),
            }
        })

        if (!checkUniqueId) {
            return res.status(404).json({
                success: false,
                msg: "Product not found!"
            })
        }

        const result = await ProductModels.delete({
            where: {
                id: parseInt(id)
            }
        })

        res.status(200).json({
            success: true,
            msg: "Successfully delete product!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}