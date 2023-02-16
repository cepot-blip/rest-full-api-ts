import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcryptjs from 'bcryptjs';
import cryptoJs from "crypto-js"
import env from "dotenv"
import { AdminModels } from '../../models/Models';

env.config()

const salt = bcryptjs.genSaltSync(10)


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