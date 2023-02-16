import { storage } from './../../utils/firebase';
import { request, response } from "express"
import { ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';


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