
const mongoose=require("mongoose")
const Schema=mongoose.Schema;
const todoSchema=new Schema({
    toDo:{
        type:String,
        required:true
    }
})
const todoModel=mongoose.model("user1",todoSchema)
module.exports=todoModel