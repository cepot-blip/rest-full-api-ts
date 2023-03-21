import { Response, Request } from "express"
import { ProductModels } from "../../../models/Models";

/**
 * @function ProductGetList ini digunakan untuk mendapatkan list product yang ada di database
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