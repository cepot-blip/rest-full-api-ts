import { EventModels } from './../../models/Models';
import { Request, Response } from "express"


/**
 * @function EventDelete ini digunakan untuk menghapus event berdasarkan id
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @returns mengembalikan data event yang baru dibuat
 * @throws akan mengembalikan error jika terjadi kesalahan pada server
 * @throws akan mengembalikan error jika id tidak ditemukan
 * 
 * @author cepot-blip
*/



export const EventDelete = async (req: Request, res: Response) => {
    try {
        const {id} = await req.body
        const checkUniqueId = await EventModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if(!checkUniqueId){
            return res.status(404).json({
                success : false,
                msg : "Event not found!"
            })
        }

        const deleteEvent = await EventModels.delete({
            where : {
                id : parseInt(id)
            }
        })

        return res.status(200).json({
            success : true,
            msg : "Event deleted successfully!",
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}




