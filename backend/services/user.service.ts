import { injectable } from "inversify";
import { userModel } from "../models";
import  bcrypt  from "bcrypt";
import { authModel } from "../models/auth.model";
import jwt,{ Jwt, JwtPayload } from "jsonwebtoken";
import config from "config";
@injectable()
export class userService{
    async addUser(bodyData:any){
        await userModel.create(bodyData);
        return {'message' : "user is created!!"};
    }

    async deleteUser(userId: string){
        console.log(userId);
        const response=await userModel.findByIdAndDelete(userId);
        console.log(response);
        return {'message': 'user is deleted!!'};
    }
    async getAllUsers(){
        const data = await userModel.find({});
        return data;
    }
    async signup(userdata:any){
        try {
            const hashedpassword=await bcrypt.hash(userdata.password,10)
            userdata.password=hashedpassword
            const responsedata=await authModel.create(userdata)
            if(responsedata){
                return {status:true,content:"user sucessfully signed up"}
            }
            else{
                throw new Error("User is not created")
            }
        } catch (error:any) {
            throw(error)
            return {status:false,content:error.message}
            
        }
    }
    async login(userdata:any){
        try {
            const user=await authModel.findOne({userId:userdata.userId})
        
            if(!user){
                throw new Error("User not Found")
            }
            const isValidate=await bcrypt.compare(userdata.password,user.password)
            if(!isValidate){
                throw new Error("Invalid Credentials")
            }
            const payload:JwtPayload={
                userid:user._id,
             }
             const secret_key="SECRETKEY"
            const token=jwt.sign(payload,secret_key as string,{expiresIn:"24h"})
            const responsedata={
                message:"user successfully logged in",
                AccessToken:token
            }
            if(responsedata){
                return {status:true,content:responsedata}
            }
            else{
                throw new Error("Error in user logged in")
            }
        } catch (error:any) {
            return {status:false,content:error.message}   
        }
    }
}