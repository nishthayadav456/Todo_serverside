const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const UserModel=require("../models/user")

const signup=async(req,res)=>{
try{
const {username,email,password}=req.body //extract username,email password from request body
const user=await UserModel.findOne({email}) //find the user by username
if(user){
    return res.status(400).json('User already exist')
}
const userModel=new UserModel({ username,email,password}) //created using the usermodel
userModel.password=await bcrypt.hash(password,10)
await userModel.save() //user is save to the db
const token=jwt.sign( //generate token
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
const user=await UserModel.findOne({email}) //find the user by username
if(!user){  //if user doesn't match
    return res.status(404).json('user not found')
}
const isPasswordValid=await bcrypt.compare(password,user.password)
if(!isPasswordValid){ //if password doesn't match
    return res.status(401).json({message:"Password is inValid"})
}
  const token=jwt.sign( //generate token
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