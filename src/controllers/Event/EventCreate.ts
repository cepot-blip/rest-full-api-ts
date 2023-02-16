import { Request, Response } from 'express';
import { EventModels } from '../../models/Models';


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

        const createEvent = await EventModels.create({
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
