import { Request, Response } from "express"
import { AdminModels } from '../../../models/Models';

/**
 * @function AdminDelete ini digunakan untuk menghapus data admin
 * @function checkId ini digunakan untuk mengecek apakah id yang akan dihapus ada atau tidak
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @returns mengembalikan data admin yang baru dibuat
 * @throws akan mengembalikan error jika terjadi kesalahan pada server
 * @throws akan mengembalikan error jika id tidak ditemukan
 * @throws akan mengembalikan error jika terjadi kesalahan pada server
 * 
 * @author cepot-blip
 */

export const AdminDelete = async (req: Request, res: Response) => {
	try {
		const { id } = await req.body

		const checkId = await AdminModels.findFirst({
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

		const result = await AdminModels.delete({
			where: {
				id: parseInt(id),
			},
		})

		res.status(201).json({
			success: true,
			msg: "Successfully delete admin!",
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		})
	}
}