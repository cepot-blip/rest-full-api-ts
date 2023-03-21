import { MainBannerModels } from '../../../models/Models'
import { Request, Response } from 'express';

/**
 * @function MainBannerUpdate ini digunakan untuk mengupdate main banner
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @returns mengembalikan data yang baru saja diupdate
 * @function checkUniqueId ini digunakan untuk mengecek apakah id yang diinputkan ada atau tidak
 * @function result ini digunakan untuk menampung data yang telah diupdate
 * 
 * @author cepot-blip
 */

export const MainBannerUpdate = async (req: Request, res: Response) => {
    try {
        const {id} = await req.params
        const data = await req.body
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

        const result = await MainBannerModels.update({
            where : {
                id : parseInt(id)
            },
            data : {
                images : data.images,
                description : data.description,
                link : data.link,
                aggregate : parseInt(data.aggregate)
            }
        })

        return res.status(200).json({
            success : true,
            msg : "Main banner updated successfully!",
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}