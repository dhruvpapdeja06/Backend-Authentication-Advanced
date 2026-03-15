import dotenv from 'dotenv';

dotenv.config();

if(!process.env.MONGO_URI){
    throw new Error("MONGO URI is not present in enviornment variable");
}

if(!process.env.JWT_SECRET){
    throw new Error("JWT SECRET is not present in enviornment variable");
}

const config = {
    MONGO_URI : process.env.MONGO_URI,
    JWT_SECRET : process.env.JWT_SECRET
}

export default config;