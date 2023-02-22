import { Request, Response } from "express"
import { UsersModels } from "../../models/Models";

/**
 * @function UsersRead ini digunakan untuk menampilkan data user
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @function page ini digunakan untuk menampung data page
 * @function limit ini digunakan untuk menampung data limit
 * @function skip ini digunakan untuk menampung data skip
 * @function filter ini digunakan untuk menampung data filter
 * @function includes ini digunakan untuk menampung data includes
 * @function result ini digunakan untuk menampung data result
 * 
 * @author cepot-blip
*/

export const UsersRead = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;
      const filter = req.body.filter ?? {};
      const includes = req.body.includes ?? {};
      const result = await UsersModels.findMany({
        skip: skip,
        take: limit,
        orderBy: { id: 'desc' },
        where: filter,
        include: includes
      });
  
      const conn = await UsersModels.count();
  
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