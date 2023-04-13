import { Request, Response } from "express"
import bcryptjs from 'bcryptjs';
import env from "dotenv"
import { UsersModels } from "../../../models/Models";
env.config()
const salt = bcryptjs.genSaltSync(10)

/**
 * @function UsersUpdate ini digunakan untuk update data user
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @function checkUniqueId ini digunakan untuk mengecek apakah id yang diinput sudah ada atau belum
 * @function checkUniqueEmail ini digunakan untuk mengecek apakah email yang diinput sudah ada atau belum
 * @returns mengembalikan data yang baru saja diupdate
 * @function result ini digunakan untuk menampung data yang telah diupdate
 * 
 * @author cepot-blip
*/

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


		await UsersModels.update({
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

