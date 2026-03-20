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

if(!process.env.GOOGLE_USER){
    throw new Error("USER is not present in enviornment variable");
}



const config = {
    MONGO_URI : process.env.MONGO_URI,
    JWT_SECRET : process.env.JWT_SECRET,
    CLIENT_ID : process.env.GOOGLE_CLIENT_ID,
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    REFRESH_TOKEN : process.env.GOOGLE_REFRESH_TOKEN,
    USER : process.env.GOOGLE_USER,
    
}

console.log("USER:", config.USER);
console.log("CLIENT_ID:", config.CLIENT_ID);
console.log("CLIENT_SECRET:", config.CLIENT_SECRET);
console.log("REFRESH_TOKEN:", config.REFRESH_TOKEN);


export default config;