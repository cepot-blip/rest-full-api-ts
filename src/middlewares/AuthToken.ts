import jwt from "jsonwebtoken"
import env from "dotenv"
import { Response, Request } from "express"
import cryptoJs from "crypto-js"
env.config()

/**
 * @function authCheck ini digunakan untuk melakukan autentikasi user
 * @interface JwtPayload ini digunakan untuk mendefinisikan tipe data dari token 
 * @param id ini adalah id dari user
 * @param exp ini adalah waktu expired dari token
 * @param next ini adalah fungsi yang akan dijalankan setelah fungsi authCheck selesai
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * @throws mengembalikan nilai promise
 * 
 * @author cepot-blip
*/

interface JwtPayload {
    id: number;
    exp: number;
}

export const authCheck = async (req: Request, res: Response, next:any) => {
	try {
		const token = await req.headers["authorization"]

		if (!token) {
			res.status(401).json({
				success: false,
				msg: "Login first to get tokens ?",
			})
			return
		}

		const decToken = await cryptoJs.AES.decrypt(token.split(" ")[1], process.env.API_SECRET).toString(cryptoJs.enc.Utf8)

		const verify = await jwt.verify(decToken, process.env.API_SECRET) as JwtPayload

		if (!verify) {
			res.status(401).json({
				success: false,
				msg: "Login first to get tokens ?",
			})
			return
		}

		if (verify.exp < Date.now() / 1000) {
			res.status(401).json({
				success: false,
				msg: "Token Expirited",
			})
			return
		}

		next()
	} catch (error) {
		res.status(401).json({
			success: false,
			msg: "Login first to get tokens ?",
		})
	}
}
