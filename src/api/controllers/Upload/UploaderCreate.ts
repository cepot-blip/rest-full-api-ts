import { storage } from './../../utils/firebase';
import { Request, Response } from "express"
import { ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

/**
 * @function UploaderCreate ini digunakan untuk mengupload file ke firebase storage 
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @function base64 ini digunakan untuk menampung data base64 dari file yang akan diupload
 * @function filename ini digunakan untuk menampung nama file yang akan diupload
 * @function sp ini digunakan untuk menampung data base64 yang telah dipotong menggunakan split untuk mendapatkan ekstensi file 
 * @function ext ini digunakan untuk menampung data base64 yang telah dipotong
 * @function hashFilename ini digunakan untuk menampung data base64 yang telah dipotong
 * @function storageRef ini digunakan untuk menampung data base64 yang telah dipotong
 * @function generatedData ini digunakan untuk menampung data base64 yang telah dipotong
 * @returns mengembalikan data yang baru saja dibuat
 * 
 * @author cepot-blip
 */

export const UploaderCreate = async (req: Request, res: Response) => {
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