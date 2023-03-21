import { EventPostsModels } from '../../../models/Models'
import { Request, Response } from 'express';

/**
 * @function EventPostsRead ini digunakan untuk menampilkan event post yang ada di database
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @function page ini digunakan untuk menentukan halaman yang akan ditampilkan
 * @function limit ini digunakan untuk menentukan batas data yang akan ditampilkan
 * @function skip ini digunakan untuk menentukan data yang akan dilewati
 * @function filter ini digunakan untuk menentukan filter yang akan digunakan untuk menampilkan data yang diinginkan
 * @returns mengembalikan data yang telah dibaca
 * @function result ini digunakan untuk menampung data yang telah dibaca
 * 
 * @author cepot-blip
 */

export const EventPostsLikeRead= async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;
        const filter = req.body.filter ?? {};
        const result = await EventPostsModels.findMany({
          skip: skip,
          take: limit,
          orderBy: { id: 'desc' },
          where: filter,
          include : {
            Event_Post_Like : {
                select : {
                    id : true,
                    user_id : true
                }
            }                
        }
        });
    
        const conn = await EventPostsModels.count();
    
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