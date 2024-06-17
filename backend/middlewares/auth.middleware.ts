import config from "config";
import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import jwt ,{ JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongoose";
import { ParsedQs } from "qs";
export interface Token{
    userId:ObjectId,
    role:string
}
declare module "express-serve-static-core"{
    interface Request{
        user:Token
    }
}
@injectable()
export class AuthMiddleware extends BaseMiddleware{
    handler(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        const token=req.headers.authorization?.split(' ')[1];
        const secret_key="SECRETKEY"
        if(!token){
            return res.status(500).json({status:false,content:"User is not LoggedIn"})
        }
        try {
            const decoded:JwtPayload=jwt.verify(token,secret_key) as JwtPayload 
            if(!decoded){
                throw new Error("invalid user")
            }
            req.user=decoded as Token
            next();
        } catch (error:any) {
            return  res.status(401).json({status:false,content:error.message})
        }
    }
}