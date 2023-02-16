import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcryptjs from 'bcryptjs';
import env from "dotenv"
import cryptoJs from "crypto-js"
import { UsersModels } from "../../models/Models";
env.config()


interface JwtPayload {
    id: number;
    exp: number;
}


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

		const comparePassword = await bcryptjs.compareSync(password, Usercheck.password)

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