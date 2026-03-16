/*
For every device we maintain an session 

if revoke is true then we can't use the same refreshToken to generate access Token
if not access token then user not rqst to the server
*/

import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "users",
        requried: [true,"User is required"]
    },
    refreshTokenHash: {
        type: String,
        required: [true,"Refresh Token Hash is required"]
    },
    ip:{
        type: String,
        required: [true,"IP address is required"]
    },
    userAgent: {
        type: String,
        required: [true,"User Agent is required"]
    },
    revoked:{
        type: Boolean,
        default: false
    },
},
    {timestamps : true}
)

const sessionModel = mongoose.model("sessions",sessionSchema)

export default sessionModel;