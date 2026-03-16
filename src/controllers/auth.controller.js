import userModel from "../models/user.model.js";
import crypto from 'crypto';
import config from "../config/config.js";
import jwt from 'jsonwebtoken';
import sessionModel from "../models/session.model.js";

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

    const refreshToken = jwt.sign({
        id : user._id
    }, config.JWT_SECRET,
        {   
            expiresIn: "1d"
        })
    

    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');


    const session = await sessionModel.create({
        id: user._id,
        refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers['user-agent']
    })


    res.cookie("refreshToken", refreshToken,{
        httpOnly: true,  // client side Js not read the cookie 
        secure: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000
    }) 

    // create a token --> Access token --> 15min before that client sent the rqst to refresh token to generate new token
    const accessToken = jwt.sign({
        sessionId: session._id,
        id: user._id
    },
    config.JWT_SECRET,
    {expiresIn : '15m'})

    return res.status(201).json({
        message: "User created successfully",
        user: {
            username : user.username,
            email: user.email
        },
        accessToken
    })
}

/**
 * @name getMeUserController
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
        console.log(decoded);
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


/**
 * @name refreshTokenController
 * @description Create access token with refresh token
 * @access Private
 */

export async function refreshTokenController(req,res){
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(400).json({
            message: "Refresh token not found"
        })
    }

    const decoded = jwt.verify(refreshToken, config.JWT_SECRET);


    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest("hex");

   // session --> when refresh token false, session logout by user then not generate

    const session = await sessionModel.findOne({
        refreshTokenHash,
        revoked: false
    })

    if(!session){
        return res.status(401).json({
            message: "invalid refresh token"
        })
    }



    const accessToken = jwt.sign({
        id: decoded.id
    },config.JWT_SECRET,
    {
        'expiresIn' : '15m'
    })


    const newRefreshToken = jwt.sign({
        id : decoded.id
    },config.JWT_SECRET,
    {
        'expiresIn' : "1d"
    })

    const newRefreshTokenHash = crypto.createHash('sha256').update(newRefreshToken).digest("hex");

    session.refreshTokenHash = newRefreshTokenHash;
    await session.save();

    res.cookie('refreshToken', newRefreshToken,{
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 50 * 1000
    })

    res.status(200).json({
        message : "Access token refreshed successfully"
    })
}


/**
 * @name logoutUserController
 * @description Logout user 
 * @access Public
 */

export async function logoutUserController(req,res){
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(400).json({
            message : "Refresh token not found"
        })
    }

    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest("hex");

    const session = await sessionModel.findOne({
        refreshTokenHash,
        revoked: false
    })

    if(!session){
        return res.status(400).json({
            message: "Invalid refresh token"
        })
    }

    session.revoked = true;
    await session.save();

    res.clearCookie("refreshToken");

    res.status(200).json({
        message: "Logged out successfully"
    })
}