import { MainBannerModels } from '../../../models/Models'
import { Request, Response } from 'express';

/**
 * @function MainBannerCreate ini digunakan untuk membuat main banner
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @returns mengembalikan data yang baru saja dibuat
 * @function result ini digunakan untuk menampung data yang telah dibuat
 * 
 * @author cepot-blip
 */

export const MainBannerCreate = async (req: Request, res: Response) => {
    try {
        const {
            images,
            description,
            link,
            aggregate
        } = await req.body

        await MainBannerModels.create({
            data : {
                images : images,
                description : description,
                link : link,
                aggregate : parseInt(aggregate)
            }
        })

        return res.status(200).json({
            success : true,
            msg : "Main banner created successfully!",
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}
