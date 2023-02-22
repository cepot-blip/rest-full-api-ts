import { Request, Response } from "express"
import { UsersModels } from "../../models/Models";

/**
 * @function UsersDelete ini digunakan untuk menghapus data user
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @function checkId ini digunakan untuk mengecek apakah id yang diinput sudah ada atau belum
 * @returns mengembalikan data yang baru saja dihapus
 * @function result ini digunakan untuk menampung data yang telah dihapus
 * 
 * @author cepot-blip
*/

export const UsersDelete = async (req: Request, res: Response) => {
	try {
		const { id } = await req.body

		const checkId = await UsersModels.findFirst({
			where: {
				id: parseInt(id),
			}
		})

		if (!checkId) {
			return res.status(404).json({
				success: false,
				message: 'Id not found!',
			})
		}

		const result = await UsersModels.delete({
			where: {
				id: parseInt(id),
			},
		})

		res.status(201).json({
			success: true,
			msg: "Successfully delete users!",
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		})
	}
}
