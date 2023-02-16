import { Request, Response } from "express"
import { ShopModels } from '../../models/Models';


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