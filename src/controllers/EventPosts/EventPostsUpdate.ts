import { EventPostsModels } from './../../models/Models';
import { Request, Response } from 'express';

/**
 * @function EventPostUpdate ini digunakan untuk mengupdate event post
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @function checkUniqueId ini digunakan untuk mengecek apakah id yang diinputkan ada atau tidak
 * @function checkUniqueUserId ini digunakan untuk mengecek apakah user id yang diinputkan ada atau tidak
 * @function checkUniqueEventId ini digunakan untuk mengecek apakah event id yang diinputkan ada atau tidak
 * @returns mengembalikan data yang baru saja diupdate
 * @function result ini digunakan untuk menampung data yang telah diupdate
 * 
 * @author cepot-blip
 */

export const EventPostUpdate = async (req: Request, res: Response) => {
    try {
        const { id } = await req.params
        const data = await req.body

        const checkUniqueId = await EventPostsModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        const checkUniqueUserId = await EventPostsModels.findFirst({
            where : {
                id : parseInt(data.user_id)
            }
        })

        const checkUniqueEventId = await EventPostsModels.findFirst({
            where : {
                id : parseInt(data.event_id)
            }
        })

        if(!checkUniqueId){
            return res.status(404).json({
                success : false,
                msg : "Id not found!"
            })
        }

        if(checkUniqueUserId){
            return res.status(404).json({
                success : false,
                msg : "User Id not found!"
            })
        }

        if(!checkUniqueEventId){
            return res.status(404).json({
                success : false,
                msg : "Event Id not found!"
            })
        }

        const result = await EventPostsModels.update({
            where : {
                id : parseInt(id)
            },
            data : {
                user_id : parseInt(data.user_id),
                event_id : parseInt(data.event_id),
                comment : data.comment,
                images : data.images
            }
        })

        return res.status(200).json({
            success : true,
            msg : "Event post updated successfully!",
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}