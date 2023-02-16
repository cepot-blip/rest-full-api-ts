import { Request, Response } from "express"
import bcryptjs from 'bcryptjs';
import env from "dotenv"
import { UsersModels } from "../../models/Models";

env.config()

const salt = bcryptjs.genSaltSync(10)

interface JwtPayload {
    id: number;
    exp: number;
}

export const UsersUpdate = async (req: Request, res: Response) => {
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
		const { id } = await req.params

		const checkUniqueId = await UsersModels.findUnique({
			where: {
				id: parseInt(id),
			}
		})

		const checkUniqueEmail = await UsersModels.findUnique({
			where: {
				email: email,
			}
		})

		if (!checkUniqueId) {
			return res.status(404).json({
				success: false,
				message: 'Id not found!',
			})
		}

		if (checkUniqueEmail) {
			return res.status(400).json({
				success: false,
				message: 'Email already exist!',
			})
		}


		const result = await UsersModels.update({
			where: {
				id: parseInt(id),
			},
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

		res.status(201).json({
			success: true,
			msg: "Successfully update users!",
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		})
	}
}

