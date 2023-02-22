import { MainBannerModels } from './../../models/Models';
import { Request, Response } from 'express';

/**
 * @function MainBannerDelete ini digunakan untuk menghapus main banner
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @returns mengembalikan data yang baru saja dihapus
 * @function result ini digunakan untuk menampung data yang telah dihapus
 * 
 * @author cepot-blip
 */

export const MainBannerDelete = async (req: Request, res: Response) => {
    try {
        const {id} = await req.body
        const checkUniqueId = await MainBannerModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if(!checkUniqueId){
            return res.status(404).json({
                success : false,
                msg : "Main banner not found!"
            })
        }

        const result = await MainBannerModels.delete({
            where : {
                id : parseInt(id)
            }
        })

        return res.status(200).json({
            success : true,
            msg : "Main banner deleted successfully!",
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}