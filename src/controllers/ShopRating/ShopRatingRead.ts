import { Request, Response } from "express"
import { ShopRatingModels } from '../../models/Models';

/**
 * @function ShopRatingReadAll ini digunakan untuk membaca semua rating toko
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @function page ini digunakan untuk menentukan halaman
 * @function limit ini digunakan untuk menentukan batas data yang ditampilkan
 * @function skip ini digunakan untuk menentukan data yang dilewati
 * @function filter ini digunakan untuk menentukan filter yang akan digunakan
 * @returns mengembalikan data yang telah dibaca
 * @function result ini digunakan untuk menampung data yang telah dibaca
 * 
 * @author cepot-blip
 */

export const ShopRatingReadAll = async (req : Request, res : Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;
        const filter = req.body.filter ?? {};
        const result = await ShopRatingModels.findMany({
          skip: skip,
          take: limit,
          orderBy: { id: 'desc' },
          where: filter,
          include : {
            Users : {
                select : {
                    id : true,
                    name : true,
                    email : true,
                    phone : true,
                    address : true,
                    avatar : true,
                    gender : true,
                }
            },
            Shop : {
                select : {
                    id : true,
                    name : true,
                    description : true,
                    phone : true,
                    address : true,
                    icon : true,
                    verified : true,
                    longitude : true,
                    latitude : true,
                    instagram : true,
                    facebook : true,
                    website : true,
                }
            }
        }
    });
    
        const conn = await ShopRatingModels.count();
    
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