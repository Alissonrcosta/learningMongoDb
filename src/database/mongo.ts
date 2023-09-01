import mongoose, { connect } from "mongoose";

import dotenv from 'dotenv';
import { error } from "console";

dotenv.config();

export const mongoConnect = async() => {
    try{
        console.log('Tentando conectar com o banco MongoDb');
        await mongoose.connect(process.env.MONGO_URL as string)
        console.log('Conectado ao MongoDb')
    }catch(error){
    console.log("Erro ao tentar se conectar com MongoDB, ", error)
    }

    
};