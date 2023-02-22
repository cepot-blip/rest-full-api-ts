import { Request, Response } from 'express';
import { EventPostsLikeModels } from '../../models/Models';

/**
 * @function EventPostLikeUpdate ini digunakan untuk mengupdate like pada event post
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @function checkUniqueId ini digunakan untuk mengecek apakah id yang diinputkan ada atau tidak
 * @function checkUniqueUserId ini digunakan untuk mengecek apakah user id yang diinputkan ada atau tidak
 * @function checkUniqueEventPostId ini digunakan untuk mengecek apakah event post id yang diinputkan ada atau tidak
 * @returns mengembalikan data yang baru saja diupdate
 * @function result ini digunakan untuk menampung data yang telah diupdate
 * 
 * @author cepot-blip
 */


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
                msg : "Id not found!"
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
