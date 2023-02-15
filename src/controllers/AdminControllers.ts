import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcryptjs from 'bcryptjs';
import env from "dotenv"
import cryptoJs from "crypto-js"
import { AdminModels } from "../models/Models";

env.config()

const salt = bcryptjs.genSaltSync(10)

interface JwtPayload {
    id: number;
    exp: number;
  }

//      CREATE ADMIN
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
				app_name: "hobister-node-api",
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

//      ADMIN LOGIN
export const AdminLogin = async (req: Request, res: Response) => {
	try {
		const { email, password } = await req.body
		const adminCheck = await AdminModels.findUnique({
			where: {
				email: email,
			},
		})

		if (!adminCheck) {
			res.status(401).json({
				success: false,
				msg: "Email Not Found!",
			})
			return
		}

		const comparePassword = await bcryptjs.compareSync(password, adminCheck.password)

		const token = await jwt.sign(
			{
				app_name: "new-hobister-2023",
				id: adminCheck.id,
				email: adminCheck.email,
                role : adminCheck.role
			},
			process.env.API_SECRET,
			{
				expiresIn: "10d",
			}
		)

		const hashToken = await cryptoJs.AES.encrypt(token, process.env.API_SECRET).toString()

		res.setHeader("Access-Controll-Allow-Origin", "*")

		res.status(200).json({
			success: true,
			token: hashToken,
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		})
	}
}

//      ADMIN READ ALL (for admin)
export const AdminRead = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;
      const filter = req.body.filter ?? {};
      const result = await AdminModels.findMany({
        skip: skip,
        take: limit,
        orderBy: { id: 'desc' },
        where: filter,
      });
  
      const conn = await AdminModels.count();
  
      const totalPage = Math.ceil(conn / limit);
  
      res.status(200).json({
        success: true,
        current_page: page,
        total_page: totalPage,
        total_data: conn,
        query: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };
  

//      ADMIN UPDATE
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

//      ADMIN DELETE
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



//		ADMIN AUTH
export const AdminAuth = async (req: Request, res: Response): Promise<unknown> => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({
          success: false,
          error: "Token not found!",
        });
      }
  
      const bearer = token.split(" ")[1];
      const decToken = cryptoJs.AES.decrypt(bearer, process.env.API_SECRET).toString(cryptoJs.enc.Utf8);
      const verify = jwt.verify(decToken, process.env.API_SECRET) as JwtPayload;
  
      if (!verify) {
        return res.status(401).json({
          success: false,
          error: "Error",
        });
      }
  
      if (verify.exp < Date.now() / 1000) {
        return res.status(401).json({
          success: false,
          error: "Token Expired",
        });
      }
  
      const getUserData = await AdminModels.findUnique({
        where: {
          id: verify.id,
        },
      });
  
      const { password, ...userData } = getUserData;
  
      return res.status(200).json({
        success: true,
        query: userData,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };