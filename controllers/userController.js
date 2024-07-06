const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const UserModel=require("../models/user")

const signup=async(req,res)=>{
    try{
const {username,email,password}=req.body
const user=await UserModel.findOne({email})
if(user){
    return res.status(400).json('User already exist')
}
const userModel=new UserModel({ username,email,password})
userModel.password=await bcrypt.hash(password,10)
await userModel.save()
const token=jwt.sign(
    {email:userModel.email, _id: userModel.id},
    process.env.JWT_SECRET,
    {expiresIn:'2d'}
  )  
res.status(201).json({message:"User Signup successfully",token,email,username: userModel.username})
    
    }
    catch(error){
res.status(500).json({message:"Internal Server Error"})
    }
}

const login=async(req,res)=>{
    try{
const {email,password}=req.body
const user=await UserModel.findOne({email})
if(!user){
    return res.status(404).json('user not found')
}
const isPasswordValid=await bcrypt.compare(password,user.password)
if(!isPasswordValid){
    return res.status(401).json({message:"Password is inValid"})
}
  const token=jwt.sign(
    {email:user.email,_id:user.id},
    process.env.JWT_SECRET,
    {expiresIn:'2d'}
  )  


return res.status(200).json({message:"User is successfully logged In",token,email,username:user.username

})
    
    }
    catch(error){
        console.log(error);
return res.status(500).json({message:"Internal Server Error"})
    }
}

module.exports={signup,login}