import { Request, Response } from 'express';
import { EventPostsLikeModels } from '../../models/Models';


export const EventPostLikeUpdate= async (req: Request, res: Response) => {
    try {
        const {id} = await req.params
        const data = await req.body

        const checkUniqueId = await EventPostsLikeModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        const checkUniqueUserId = await EventPostsLikeModels.findFirst({
            where : {
                id : parseInt(data.user_id)
            }
        })

        const checkUniqueEventPostId = await EventPostsLikeModels.findFirst({
            where : {
                id : parseInt(data.event_post_id)
            }
        })

        if(!checkUniqueId){
            return res.status(404).json({
                success : false,
                msg : "Event Post Like Id not found!"
            })
        }

        if(checkUniqueUserId){
            return res.status(404).json({
                success : false,
                msg : "User Id not found!"
            })
        }

        if(!checkUniqueEventPostId){
            return res.status(404).json({
                success : false,
                msg : "Event Post Id not found!"
            })
        }

        const result = await EventPostsLikeModels.update({
            where : {
                id : parseInt(id)
            },
            data : {
                user_id : parseInt(data.user_id),
                event_post_id : parseInt(data.event_post_id)
            }
        })


        return res.status(200).json({
            success : true,
            msg : "Event post like updated successfully!",
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}
