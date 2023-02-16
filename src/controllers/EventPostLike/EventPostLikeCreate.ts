import { Request, Response } from 'express';
import { EventPostsLikeModels } from '../../models/Models';


export const EventPostLikeCreate = async (req: Request, res: Response)=> {
    try {
        const {
            user_id,
            event_post_id
        } = await req.body

        const checkUniqueUserId = await EventPostsLikeModels.findFirst({
            where : {
                id : parseInt(user_id)
            }
        })

        const checkUniqueEventPostId = await EventPostsLikeModels.findFirst({
            where : {
                id : parseInt(event_post_id)
            }
        })

        if(checkUniqueUserId){
            return res.status(404).json({
                success : false,
                msg : "User Id not found!"
            })
        }

        if(checkUniqueEventPostId){
            return res.status(404).json({
                success : false,
                msg : "Event Post Id not found!"
            })
        }

        const result = await EventPostsLikeModels.create({
            data : {
                user_id : parseInt(user_id),
                event_post_id : parseInt(event_post_id)
            }
        })

        return res.status(200).json({
            success : true,
            msg : "Event post like created successfully!",
        })


    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}