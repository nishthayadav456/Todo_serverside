const express = require('express')
const cors=require('cors')
const app = express()
require('dotenv').config()
const userRoutes=require("./Routes/userRoutes")
const connection=require('./db')
const todoRoutes = require('./Routes/todoRoutes')
connection()
//middlewares
app.use(express.json())//transfer the data we r passing from our frontend to backend transfer in json format
app.use(cors())

app.get('/',(req,res)=>{
    res.send("hello")
})
app.use("/api",userRoutes)
app.use("/api",todoRoutes)
const port = 3001
app.listen(port, () => console.log(`server is running on port ${port}!`))