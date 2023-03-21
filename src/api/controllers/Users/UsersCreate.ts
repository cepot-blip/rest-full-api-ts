import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcryptjs from 'bcryptjs';
import env from "dotenv"
import cryptoJs from "crypto-js"
import { UsersModels } from "../../../models/Models";
env.config()
const salt = bcryptjs.genSaltSync(10)

/**
 * @function UsersCreate ini digunakan untuk membuat user baru
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @function checkUniqueEmail ini digunakan untuk mengecek apakah email yang diinput sudah ada atau belum
 * @returns mengembalikan data yang baru saja dibuat
 * 
 * @author cepot-blip
 */


export const UsersCreate = async (req: Request, res: Response) => {
	try {
		const {
			email,
			password,
			name,
			phone,
			gender,
			avatar,
			address
		} = await req.body

		const checkUniqueEmail = await UsersModels.findUnique({
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

		const createUsers = await UsersModels.create({
			data: {
				email: email,
				password: bcryptjs.hashSync(password, salt),
				name: name,
				phone: phone,
				gender: gender,
				avatar: avatar,
				address: address
			},
		})

		const token = await jwt.sign(
			{
				app_name: "hobister-node-api",
				id: createUsers.id,
				email: createUsers.email,
				name: createUsers.name,
			},
			process.env.API_SECRET,
			{
				expiresIn: "1d",
			}
		)

		const hashToken = await cryptoJs.AES.encrypt(token, process.env.API_SECRET).toString()

		res.status(200).json({
			success: true,
			msg: "Successfully created users!",
			token: hashToken,
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		})
	}
}


