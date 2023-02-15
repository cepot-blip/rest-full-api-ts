import jwt from "jsonwebtoken"
import env from "dotenv"
import { Response, Request } from "express"
import cryptoJs from "crypto-js"
env.config()

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
