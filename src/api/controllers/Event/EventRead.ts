import { Request, Response } from 'express';
import { EventModels } from '../../../models/Models'

/**
 * @function EventRead ini digunakan untuk menampilkan data event yang sudah dibuat
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @function page ini digunakan untuk menampung data page
 * @function limit ini digunakan untuk menampung data limit
 * @function skip ini digunakan untuk menampung data skip
 * @function filter ini digunakan untuk menampung data filter
 * @function result ini digunakan untuk menampung data yang telah dibuat
 * @returns mengembalikan data event yang sudah dibuat
 * @throws akan mengembalikan error jika terjadi kesalahan pada server
 * 
 * @author cepot-blip
*/


export const EventRead= async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;
        const filter = req.body.filter ?? {};
        const result = await EventModels.findMany({
          skip: skip,
          take: limit,
          orderBy: { id: 'desc' },
          where: filter,
          include : {
            Event_Posts : {
                        select : {
                            id : true,
                            user_id : true,
                            comment : true,
                            images : true,
        }
    }
}
        });
    
        const conn = await EventModels.count();
    
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

