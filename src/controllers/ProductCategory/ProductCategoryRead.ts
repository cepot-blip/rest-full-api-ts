import { Response, Request } from "express"
import { ProductCategoryModels } from '../../models/Models';

/**
 * @function ProductCategoryRead ini digunakan untuk membaca kategori produk
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @function page ini adalah halaman yang akan ditampilkan
 * @function limit ini adalah batas data yang akan ditampilkan
 * @function skip ini adalah data yang akan dilewati
 * @function filter ini adalah filter yang akan digunakan untuk menampilkan data yang diinginkan
 * @returns mengembalikan data yang telah dibaca
 * @function result ini digunakan untuk menampung data yang telah dibaca
 * 
 * @author cepot-blip
*/

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