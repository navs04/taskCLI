const express = require("express");
const router = express.Router();

const Todo = require("../models/Todo");

router.get("/", async (req, res) => {
    try{
        const todos = await Todo.find();
        res.json(todos);
    } catch(error){
        res.status(500).json({message: error.message});
    }
});

router.post("/", async (req, res) => {
    try{
        const newTodo = new Todo({
            text: req.body.text,
        });

        const savedTodo = await newTodo.save();

        res.status(201).json(savedTodo);
    } catch(error){
        res.status(500).json({message: error.message});
    }
});

router.delete("/:id", async(req, res) => {
    try{
        await Todo.findByIdAndDelete(req.params.id);

        res.json({ message: "Todo deleted"});
    } catch(error){
        res.status(500).json({message: error.message});
    }
});

router.put("/:id", async(req, res) => {
    try{
        const todo = await Todo.findById(req.params.id);

        if(!todo){
            return res.status(404).json({message: "Todo not found"});
        }

        todo.completed = !todo.completed;
        
        const updatedTodo = await todo.save();

        res.json(updatedTodo);
    } catch(error){
        res.status(500).json({message: error.message});
    }
});

module.exports = router;