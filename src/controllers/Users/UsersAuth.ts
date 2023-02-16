import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import env from "dotenv"
import cryptoJs from "crypto-js"
import { UsersModels } from "../../models/Models";

env.config()


interface JwtPayload {
    id: number;
    exp: number;
}


export const UsersAuth = async (req: Request, res: Response): Promise<unknown> => {
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