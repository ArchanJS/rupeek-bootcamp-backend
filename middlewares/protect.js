const User=require('../models/User');
const jwt=require('jsonwebtoken');

exports.protect=async(req,res,next)=>{
    try {
        let token;
        if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(" ")[1];
        }
        if(!token){
            throw new Error("User unauthorized!");
        }
        console.log(token);
        const verifiedToken=jwt.verify(token,process.env.SECRET_KEY);
        const user= await User.findOne({_id:verifiedToken._id});
        if(!user){
            throw new Error("User unauthorized!");
        }
        req.user=user;
        next();
    } catch (error) {
        console.log(error);
        next(new Error("Something went wrong!"));
    }
}