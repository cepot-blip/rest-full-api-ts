import { EventPostsModels } from './../../models/Models';
import { Request, Response } from 'express';


export const EventPostDelete = async (req: Request, res: Response) => {
    try {
        const {id} = await req.body
        const checkUniqueId = await EventPostsModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if(!checkUniqueId){
            return res.status(404).json({
                success : false,
                msg : "Id not found!"
            })
        }

        const result = await EventPostsModels.delete({
            where : {
                id : parseInt(id)
            }
        })

        return res.status(200).json({
            success : true,
            msg : "Event post deleted successfully!",
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}