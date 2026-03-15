import mongoose from 'mongoose';
import config from './config.js';

async function connectTODB(){
    try{
        mongoose.connect(config.MONGO_URI);
        console.log(("Database is connect to server"))
    }catch(err){
        console.log("Database not connect to server", err);
        process.exit(1);
    }
}

export default connectTODB;