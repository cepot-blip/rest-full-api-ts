import { Request, Response } from "express"
import { EventModels } from '../../../models/Models'

/**
 * @function EventUpdate ini digunakan untuk mengupdate data event yang sudah dibuat sebelumnya
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @returns mengembalikan data event yang sudah diupdate
 * @throws akan mengembalikan error jika terjadi kesalahan pada server
 * 
 * @author cepot-blip
*/

export const EventUpdate = async  (req: Request, res: Response)  => {
    try {
        const { id } = await req.params
        const data = await req.body

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

        await EventModels.update({
            where : {
                id : parseInt(id)
            },
            data : {
                name : data.name,
                description : data.description,
                icon : data.icon,
                banner : data.banner,
                official : data.official,
                venue : data.venue,
                instagram : data.instagram,
                facebook : data.facebook,
                maps : data.maps,
                start_date : data.start_date,
                end_date : data.end_date,
            }
        })

        return res.status(200).json({
            success : true,
            msg : "Event updated successfully!",
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}