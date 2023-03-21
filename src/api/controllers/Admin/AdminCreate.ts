import { AdminModels } from '../../../models/Models';
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcryptjs from 'bcryptjs';
import cryptoJs from "crypto-js"
import env from "dotenv"
env.config()
const salt = bcryptjs.genSaltSync(10)

/**
 * @function AdminCreate ini digunakan untuk membuat admin baru
 * @function checkUniqueEmail ini digunakan untuk mengecek apakah email sudah terdaftar atau belum
 * @function token ini digunakan untuk membuat token
 * @function hashToken ini digunakan untuk mengenkripsi token
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @returns mengembalikan data admin yang baru dibuat
 * @throws akan mengembalikan error jika terjadi kesalahan pada server
 * @throws akan mengembalikan error jika email sudah terdaftar
 * @throws akan mengembalikan error jika terjadi kesalahan pada server
 * 
 * @author cepot-blip
 */


//		CREATE ADMIN
export const AdminCreate = async (req: Request, res: Response) => {
	try {
		const {
			email,
			password,
			avatar,
            role
		} = await req.body

		const checkUniqueEmail = await AdminModels.findUnique({
			where: {
				email: email,
			},
		})

		if (checkUniqueEmail) {
			return res.status(401).json({
				success: false,
				msg: "email already exist",
			})
		}

		const createAdmin = await AdminModels.create({
			data: {
				email: email,
				password: bcryptjs.hashSync(password, salt),
				avatar: avatar,
                role: role
			},
		})

		const token = await jwt.sign(
			{
				app_name: "new-hobister-2023",
				id: createAdmin.id,
				email: createAdmin.email,
                role : createAdmin.role
			},
			process.env.API_SECRET,
			{
				expiresIn: "1d",
			}
		)

		const hashToken = await cryptoJs.AES.encrypt(token, process.env.API_SECRET).toString()

		res.status(200).json({
			success: true,
			msg: "Successfully created admin!",
			token: hashToken,
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		})
	}
}