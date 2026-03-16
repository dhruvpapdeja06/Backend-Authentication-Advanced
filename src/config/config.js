import dotenv from 'dotenv';

dotenv.config();

if(!process.env.MONGO_URI){
    throw new Error("MONGO URI is not present in enviornment variable");
}

if(!process.env.JWT_SECRET){
    throw new Error("JWT SECRET is not present in enviornment variable");
}

if(!process.env.GOOGLE_CLIENT_ID){
    throw new Error("GOOGLE CLIENT ID is not present in enivornment variable");
}

if(!process.env.GOOGLE_CLIENT_SECRET){
    throw new Error("GOOGLE CLIENT SECRET is not present in environment variable");
}

if(!process.env.GOOGLE_REFRESH_TOKEN){
    throw new Error("GOOGLE REFRESH TOKEN is not present in environment variable")
}

if(!process.env.GOOGLE_EMAIL){
    throw new Error("GOOGLE EMAIl is not present in enviornment variable");
}

const config = {
    MONGO_URI : process.env.MONGO_URI,
    JWT_SECRET : process.env.JWT_SECRET,
    clientId : process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    clientToken : process.env.GOOGLE_REFRESH_TOKEN,
    clientEmail : process.env.GOOGLE_EMAIL
}

export default config;