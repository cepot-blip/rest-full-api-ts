import { request, response } from "express"
import { ref, uploadString, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../utils/firebase';



export const UploaderCreate = async (req = request, res = response) => {
    try {
        const { base64, filename } = await req.body
        const sp = await base64.split(";")[0]
        const ext = await sp.split("/")[1]
        const hashFilename = await filename + "_" + uuidv4()
        const storageRef = await ref(storage, `/uploads/${hashFilename}.${ext}`)
        const uploadToFb = await uploadString(storageRef, base64, 'data_url')
        const generatedData = {
            filename: hashFilename + "." + ext,
            url: ``
        }
        return res.status(201).json({
            success: true,
            query: generatedData
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        })
    }
}

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

