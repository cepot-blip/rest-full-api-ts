import { Request, Response } from "express"
import { ShopModels } from '../../models/Models';

/**
 * @function ShopReadById ini digunakan untuk membaca toko berdasarkan id
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @param id ini adalah id toko yang akan dibaca
 * @param page ini adalah halaman yang akan dibaca
 * @param limit ini adalah batas data yang akan dibaca
 * @param skip ini adalah data yang akan dilewati
 * @returns mengembalikan data yang telah dibaca
 * @function result ini digunakan untuk menampung data yang telah dibaca
 * 
 * @author cepot-blip
*/

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