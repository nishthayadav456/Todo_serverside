const {getTodos,createTodo,updateTodo,deleteTodo} =require("../controllers/todoController")
const todoRoutes=require('express').Router()
todoRoutes.get('/get',getTodos)
todoRoutes.post('/create',createTodo)
todoRoutes.put('/update/:id',updateTodo)
todoRoutes.delete('/delete/:id',deleteTodo)
module.exports=todoRoutes