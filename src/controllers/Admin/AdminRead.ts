import { Request, Response } from "express"
import { AdminModels } from '../../models/Models';


/**
 * @function AdminRead ini digunakan untuk membaca data admin
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @function page ini digunakan untuk menentukan halaman yang akan ditampilkan
 * @function limit ini digunakan untuk menentukan jumlah data yang akan ditampilkan
 * @function skip ini digunakan untuk menentukan data yang akan dilewati
 * @function filter ini digunakan untuk menentukan filter data seperti id, email, dll
 * @function result ini digunakan untuk menampung data yang akan ditampilkan
 * @function conn ini digunakan untuk menampung jumlah data yang ada
 * @function totalPage ini digunakan untuk menentukan jumlah halaman yang ada dengan cara membagi jumlah-
 * data dengan jumlah data yang ditampilkan dengan pembulatan keatas conn / limit
 * 
 * @author cepot-blip
 */


export const AdminRead = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;
      const filter = req.body.filter ?? {};
      const result = await AdminModels.findMany({
        skip: skip,
        take: limit,
        orderBy: { id: 'desc' },
        where: filter,
      });
  
      const conn = await AdminModels.count();
  
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