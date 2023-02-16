import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcryptjs from 'bcryptjs';
import cryptoJs from "crypto-js"
import { AdminModels } from "../../models/Models";
import env from "dotenv"

env.config()



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