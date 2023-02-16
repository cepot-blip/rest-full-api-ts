import { Request, Response } from "express"
import { AdminModels } from '../../models/Models';


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