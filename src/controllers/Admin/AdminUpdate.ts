import { Request, Response } from "express"
import bcryptjs from 'bcryptjs';
import { AdminModels } from "../../models/Models";
import env from "dotenv"

env.config()

const salt = bcryptjs.genSaltSync(10)

export const AdminUpdate = async (req: Request, res: Response) => {
	try {
		const {
			email,
			password,
			avatar,
            role
		} = await req.body
		const { id } = await req.params

		const checkUniqueId = await AdminModels.findUnique({
			where: {
				id: parseInt(id),
			}
		})

		const checkUniqueEmail = await AdminModels.findUnique({
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


		const result = await AdminModels.update({
			where: {
				id: parseInt(id),
			},
			data: {
				email: email,
				password: bcryptjs.hashSync(password, salt),
				avatar: avatar,
                role: role
			},
		})

		res.status(201).json({
			success: true,
			msg: "Successfully update admin!",
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		})
	}
}