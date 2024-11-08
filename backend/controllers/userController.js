import {catchAsyncError} from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import {User} from '../models/userSchema.js';

export const register=catchAsyncError(async(req,res,next)=>{
    const {name, email, phone, role, password}=req.body;
    if(!name || !email || !phone || !role || !password){
        return next(new ErrorHandler("Please fill the full registration form"));
    }
    const isEmail =await UserActivation.findOne({email});
    if(isEmail){
        return next(new ErrorHandler("Email already exists!"));
    }
    const User=await UserActivation.create({
        name,
        email,
        phone,
        role,
        password,
    });
    res.status(200).json({
        success:true,
        message:"User registered",
        user,
    })
});

