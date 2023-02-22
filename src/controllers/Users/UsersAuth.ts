import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import env from "dotenv"
import cryptoJs from "crypto-js"
import { UsersModels } from "../../models/Models";
env.config()

/**
 * @interface JwtPayload ini digunakan untuk mendefinisikan tipe data dari token
 * @param id ini adalah id dari user
 * @param exp ini adalah waktu expired dari token
 * @function UsersAuth ini digunakan untuk melakukan autentikasi user
 * @async ini digunakan untuk menandakan bahwa fungsi ini bersifat asynchronous 
 * @type Promise<unknown> ini digunakan untuk menandakan bahwa fungsi ini mengembalikan nilai promise
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * 
 * @author cepot-blip
*/


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
          error: "Token Expired!",
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