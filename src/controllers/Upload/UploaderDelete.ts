import { storage } from './../../utils/firebase';
import { request, response } from "express"
import { ref, deleteObject } from "firebase/storage";


export const UploaderDelete = async (req = request, res = response) => {
    try {
        const { filename } = await req.body
        const storageRef = await ref(storage, `/uploads/${filename}`)
        const deleteStorage = await deleteObject(storageRef)
        return res.status(201).json({
            success: true,
            message: "Successfully delete image!"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        })
    }
}
