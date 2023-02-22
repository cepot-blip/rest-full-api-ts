import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import cryptoJs from "crypto-js"
import { AdminModels } from "../../models/Models";
import env from "dotenv"
import { Role } from "@prisma/client";
env.config()

/** 
  * @interface JwtPayload ini digunakan untuk mendefinisikan tipe data dari token 
  * @param id ini adalah id dari admin
  * @param exp ini adalah waktu expired dari token
  * @param email ini adalah email dari admin
  * @param role ini adalah role dari admin
  * @function SuperAdminAuth ini digunakan untuk melakukan autentikasi admin
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
    email: string;
    role: Role;
}

export const SuperAdminAuth = async (req: Request, res: Response, next: any): Promise<unknown> => {
    try {
        const token = await req.headers.authorization;
        if (!token) {
          return res.status(401).json({
            success: false,
            message: "authorization header not found",
          });
        }
        const bearer = token.split(" ")[1];
        const decToken = cryptoJs.AES.decrypt(bearer, process.env.API_SECRET).toString(cryptoJs.enc.Utf8);
        const verify = jwt.verify (decToken, process.env.API_SECRET) as JwtPayload;
        if (verify == undefined) {
          return res.status(401).json({
            success: false,
            message: "authorization failed",
          });
        }
    
        if (verify.role !== "super_admin") {
          return res.status(401).json({
            success: false,
            error: "Forbidden!",
          });
        }
    
        req.body.email = verify.email;
        req.body.role = verify.role;

        next();

      } catch (error) {
        return res.status(401).json({
          success: false,
          error : error.message
        });
      }
}