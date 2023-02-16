import { Request, Response } from 'express';
import { EventPostsLikeModels } from '../../models/Models';


export const EventPostLikeDelete = async (req: Request, res: Response) => {
    try {
        const {id} = await req.body
        const checkUniqueId = await EventPostsLikeModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if(!checkUniqueId){
            return res.status(404).json({
                success : false,
                msg : "Event Post Like Id not found!"
            })
        }

        const result = await EventPostsLikeModels.delete({
            where : {
                id : parseInt(id)
            }
        })

        return res.status(200).json({
            success : true,
            msg : "Event post like deleted successfully!",
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}
