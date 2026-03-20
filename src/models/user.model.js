import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: [true,"Username already exits"],
        required: [true, "Username is required to create an account"],
        minLength: 4,
        trim : true
    },
    email:{
        type: String,
        required: [true,"Email is required to create an account"],
        unique: [true,"Email already registered"],
        trim: true,
        lowercase: true
    },
    password:{
        type: String,
        required: [true, "Password is required to create an account"],
        minLength: 4
    },
    verified:{
        type: Boolean,
        default: false
    }
},
    {timestamps : true}
)

const userModel = mongoose.model("users",userSchema);

export default userModel;

/*
TO access the env varible -> config.js
*/
