import { EventPostsModels } from './../../models/Models';
import { Request, Response } from 'express';


export const EventPostCreate = async (req: Request, res: Response) => {
    try {
        const {
            user_id,
            event_id,
            comment,
            images,
        } = await req.body

        const checkUniqueUserId = await EventPostsModels.findFirst({
            where : {
                id : parseInt(user_id)
            }
        })

        const checkUniqueEventId = await EventPostsModels.findFirst({
            where : {
                id : parseInt(event_id)
            }
        })

        if(checkUniqueUserId){
            return res.status(404).json({
                success : false,
                msg : "User Id not found!"
            })
        }

        if(checkUniqueEventId){
            return res.status(404).json({
                success : false,
                msg : "Event Id not found!"
            })
        }

        const result = await EventPostsModels.create({
            data : {
                user_id : parseInt(user_id),
                event_id : parseInt(event_id),
                comment : comment,
                images : images
            }
        })

        return res.status(200).json({
            success : true,
            msg : "Event post created successfully!",
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message   
        })
    }
}