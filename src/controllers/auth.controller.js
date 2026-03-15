import userModel from "../models/user.model.js";
import crypto from 'crypto';
import config from "../config/config.js";
import jwt from 'jsonwebtoken';

/**
 * @name registerUserController
 * @description register a new user, expects username , email and password
 * @access Public
 */
export async function registerUserController(req,res){
    const { username, email, password } = req.body;

    if(!username | !email | !password){
        return res.status(400).json({
            message: "Please provide username, email and password"
        })
    }

    const isUserAlreadyExits = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExits){
        return res.status(409).json({
            message: "username or email already exits"
        })
    }

    const hashPassword = crypto.createHash('sha256').update(password).digest('hex');

    // Save user in DB
    const user = await userModel.create({
        email,
        username,
        password : hashPassword
    })

    // create a token --> Access token --> 15min before that client sent the rqst to refresh token to generate new token
    const token = jwt.sign({
        id: user._id
    },
    config.JWT_SECRET,
    {expiresIn : '1d'})

    return res.status(201).json({
        message: "User created successfully",
        user: {
            username : user.username,
            email: user.email
        },
        token
    })
}

/**
 * @naem getMeUserController
 * @description Current login User
 * @access Private
 */

export async function getMeUserController(req,res){
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({
            message: 'token invalid'
        })
    }

    let decoded = null;
    try{
        decoded = jwt.verify(token,config.JWT_SECRET)
    }
    catch(err){
        console.log("Invalid token");
    }

    const user = await userModel.findById(decoded.id);

    res.status(200).json({
        message: "user fetched successfully",
        user:{
            username : user.username,
            email: user.email,
        }
    })
}