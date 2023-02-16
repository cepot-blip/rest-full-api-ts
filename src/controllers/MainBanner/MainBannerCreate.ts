import { MainBannerModels } from './../../models/Models';
import { Request, Response } from 'express';


export const MainBannerCreate = async (req: Request, res: Response) => {
    try {
        const {
            images,
            description,
            link,
            aggregate
        } = await req.body

        const result = await MainBannerModels.create({
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
