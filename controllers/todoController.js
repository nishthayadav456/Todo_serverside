const TodoModel=require("../models/todoModel")
const createTodo = async (req, res) => {
    try {
        const { toDo } = req.body;
        if (!toDo) {
            return res.status(400).json({ message: "toDo field is required" });
        }
        const todo = await TodoModel.create({ toDo });
        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({ message: "Failed to create todo", error: error.message });
    }
}
const getTodos=async(req,res)=>{
try{
const todos=await TodoModel.find();
res.status(200).send(todos);
}
catch(error){
    res.status(500).json({ message: "Failed to get todos", error: error.message });
}
}
const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTodo = await TodoModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({message: "Todo updated successfully",todo: updatedTodo});
    } catch (error) {
        res.status(400).json({ message: "Failed to update todo", error: error.message });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedTodo = await TodoModel.findByIdAndDelete(id);
        
        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        
        res.status(200).json({ message: "Todo deleted successfully", deletedTodo });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete todo", error: error.message });
    }
};
module.exports={createTodo,getTodos,updateTodo,deleteTodo}