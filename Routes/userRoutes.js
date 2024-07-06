const { signup, login } = require('../controllers/userController');
const { signupvalidation, loginvalidation } = require('../Middlewares/uservalidation');

const userRoutes=require('express').Router()
userRoutes.post('/login',loginvalidation,login)
userRoutes.post('/signup',signupvalidation,signup)

module.exports=userRoutes;