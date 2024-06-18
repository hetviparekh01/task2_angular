import { inject } from 'inversify';
import 'reflect-metadata';
import { userService } from '../services';
import { TYPE, controller, httpDelete, httpGet, httpPost } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';

@controller('/user')
export class userController{
    constructor(@inject(userService) private userServices: userService){}

    @httpPost('/signup')
    async signup(req:Request,res:Response){
        try {
            let userdata    =req.body;
            const responsedata=await this.userServices.signup(userdata);
            return res.status(200).json({status:responsedata.status,content:responsedata.content})
            // if(responsedata.status){
            // }
            // else{
            //     return res.status(404).json({status:responsedata.status,content:responsedata.content})
            // }   
            
        } catch (error:any) {
            return res.status(200).json({status:false,content:error.message})   
        }
    }
    @httpPost('/login')
    async login(req:Request,res:Response){
        try {
            let userdata=req.body;
            const responsedata=await this.userServices.login(userdata);
            if(responsedata.status){
                return res.status(200).json({status:responsedata.status,content:responsedata.content})
            }
            else{
                return res.status(404).json({status:responsedata.status,content:responsedata.content})
            }
            
        } catch (error:any) {
            return res.status(500).json({status:false,content:error.message})   
        }
    }
    @httpPost('/addUser',AuthMiddleware)
    async addUser(req: Request, res: Response){
        try{
            const bodyData = req.body;
            res.send(await this.userServices.addUser(bodyData));
        }catch(err:any){
            res.send(err.message);
        }
    }
    @httpDelete('/deleteUser')
    async deleteUser(req: Request, res: Response){
        try{
            const userId = req.query.id;
            console.log(req.query);
            res.send(await this.userServices.deleteUser(userId as string));
        }catch(err:any){
            res.send(err.message);
        }
    }
    @httpGet('/getAllUser')
    async getAllUser(req: Request, res: Response){
        try{
            res.send(await this.userServices.getAllUsers());
        }catch(err:any){
            res.send(err.message);
        }
    }
}