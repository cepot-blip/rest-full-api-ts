import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcryptjs from 'bcryptjs';
import env from "dotenv"
import cryptoJs from "crypto-js"
import { UsersModels } from "../models/Models";

env.config()

const salt = bcryptjs.genSaltSync(10)

interface JwtPayload {
    id: number;
    exp: number;
  }

//      CREATE USERS
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

//      USERS LOGIN
export const UsersLogin = async (req: Request, res: Response) => {
	try {
		const { email, password } = await req.body
		const Usercheck = await UsersModels.findUnique({
			where: {
				email: email,
			},
		})

		if (!Usercheck) {
			res.status(401).json({
				success: false,
				msg: "Email Not Found!",
			})
			return
		}

		const comparePassword = await bcryptjs.compareSync(password, Usercheck.password)

		const token = await jwt.sign(
			{
				app_name: "hobister2023",
				id: Usercheck.id,
				email: Usercheck.email,
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

//      USERS READ ALL (for admin)
export const UsersRead = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;
      const filter = req.body.filter ?? {};
      const includes = req.body.includes ?? {};
      const result = await UsersModels.findMany({
        skip: skip,
        take: limit,
        orderBy: { id: 'desc' },
        where: filter,
        include: includes
      });
  
      const conn = await UsersModels.count();
  
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
  

//      USERS UPDATE
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

//      USERS DELETE
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



//		USER AUTH
export const UserAuth = async (req: Request, res: Response): Promise<unknown> => {
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
  
      const getUserData = await UsersModels.findUnique({
        where: {
          id: verify.id,
        },
        include: {
          Shop: true,
          _count: true,
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