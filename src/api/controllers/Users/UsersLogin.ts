import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcryptjs from 'bcryptjs';
import env from "dotenv"
import cryptoJs from "crypto-js"
import { UsersModels } from "../../../models/Models";
env.config()

/**
 * @interface JwtPayload ini digunakan untuk mendefinisikan tipe data dari token 
 * @param id ini adalah id dari user
 * @param exp ini adalah waktu expired dari token
 * @function UsersLogin ini digunakan untuk melakukan login user
 * @async ini digunakan untuk menandakan bahwa fungsi ini bersifat asynchronous
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @returns mengembalikan data user yang baru saja dibuat
 * @returns mengembalikan pesan error jika email tidak ditemukan
 * @returns mengembalikan pesan error jika password tidak sesuai
 * @returns mengembalikan pesan error jika terjadi kesalahan pada server
 * @function comparePassword ini digunakan untuk membandingkan password yang diinput dengan password yang ada di database
 * @function token ini digunakan untuk membuat token
 * @function sign ini digunakan untuk membuat token
 * @function verify ini digunakan untuk memverifikasi token
 * 
 * @author cepot-blip
 */


export const UsersLogin = async (req: Request, res: Response) => {
	try {
		const { email, password } = await req.body
		const Usercheck = await UsersModels.findUnique({
			where: {
				email: email,
			},
		})

		if (!Usercheck) {
			res.status(401).json({
				success: false,
				msg: "Email Not Found!",
			})
			return
		}

		await bcryptjs.compareSync(password, Usercheck.password)

		const token = await jwt.sign(
			{
				app_name: "hobister2023",
				id: Usercheck.id,
				email: Usercheck.email,
			},
			process.env.API_SECRET,
			{
				expiresIn: "10d",
			}
		)

		const hashToken = await cryptoJs.AES.encrypt(token, process.env.API_SECRET).toString()

		res.setHeader("Access-Controll-Allow-Origin", "*")

		res.status(200).json({
			success: true,
			token: hashToken,
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		})
	}
}