import { Request, Response } from 'express';
import { EventModels } from '../../../models/Models'

/**
 * @function EventCreate ini digunakan untuk membuat event baru 
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @returns mengembalikan data event yang baru dibuat
 * @throws akan mengembalikan error jika terjadi kesalahan pada server
 * @throws akan mengembalikan error jika terjadi kesalahan pada server
 * 
 * @author cepot-blip
*/


export const EventCreate = async (req: Request, res: Response) => {
    try {
        const {
            name,
            description,
            icon,
            banner,
            official,
            venue,
            instagram,
            facebook,
            maps,
            start_date,
            end_date,
        } = await req.body

        await EventModels.create({
            data : {
                name : name,
                description : description,
                icon : icon,
                banner : banner,
                official : official,
                venue : venue,
                instagram : instagram,
                facebook : facebook,
                maps : maps,
                start_date : start_date,
                end_date : end_date,
            }
        })

        return res.status(200).json({
            success : true,
            msg : "Event created successfully!",
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}
