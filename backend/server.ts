import 'reflect-metadata';
import { connection } from "./db";
import express from 'express';
import {InversifyExpressServer} from 'inversify-express-utils';
import container from './inversfiy config/inversfiy.config';
import config from 'config';
import './controllers';
import cors from 'cors'
const server = new InversifyExpressServer(container);
server.setConfig(app=>{
    app.use(express.json())
    app.use(cors())
})

const app = server.build();
app.listen(config.get("PORT"),()=>{
    console.log('server is connected!!');
    try{
        connection().then(()=>console.log('Database is connected!!'));
    }catch(err: any){
        console.log(err.message);
    }
})