import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcryptjs from 'bcryptjs';
import cryptoJs from "crypto-js"
import { AdminModels } from "../../models/Models";
import env from "dotenv"
env.config()

/**
 * @function AdminLogin ini digunakan untuk melakukan login admin
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @function adminCheck ini digunakan untuk mengecek apakah email sudah terdaftar atau belum
 * @function comparePassword ini digunakan untuk mengecek apakah password yang dimasukkan sama dengan password yang ada di database
 * @function token ini digunakan untuk membuat token yang akan digunakan untuk autentikasi
 * @function hashToken ini digunakan untuk mengenkripsi token yang akan digunakan untuk autentikasi
 * @returns mengembalikan token yang sudah dienkripsi
 * @throws akan mengembalikan error jika terjadi kesalahan pada server
 * @throws akan mengembalikan error jika email tidak terdaftar
 * @throws akan mengembalikan error jika terjadi kesalahan pada server
 * setHeader ini digunakan untuk mengatur akses dari client ke server
 * 
 * @author cepot-blip	
 */

export const AdminLogin = async (req: Request, res: Response) => {
	try {
		const { email, password } = await req.body
		const adminCheck = await AdminModels.findUnique({
			where: {
				email: email,
			},
		})

		if (!adminCheck) {
			res.status(401).json({
				success: false,
				msg: "Email Not Found!",
			})
			return
		}

		const comparePassword = await bcryptjs.compareSync(password, adminCheck.password)

		const token = await jwt.sign(
			{
				app_name: "new-hobister-2023",
				id: adminCheck.id,
				email: adminCheck.email,
                role : adminCheck.role
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