const express = require("express")

const todoRouter = express.Router()
const {TodoModel} = require("../models/todo.model");
const {auth} = require("../middlewares/auth.middleware")

todoRouter.get("/",async(req,res)=>{
     try{
        let todo = await TodoModel.find()
        res.send(todo)
     }
     catch(err){
        res.json({msg:err})
     }
})

todoRouter.post("/create",auth, async(req, res) => {
    try {
        let todo = new TodoModel(req.body);
        await todo.save();
        res.json({msg:"Todo has been created"})
    } catch (err) {
      res.json({msg:err});
    }

});

todoRouter.patch("/update/:id",auth, async(req, res) => {
    let payload = req.body;
    let id = req.params.id;
    const todo = await TodoModel.findOne({"_id":id})
    if(req.body.userId!==todo.userId){
      res.json({msg:"You can not update someone's post"})
    }else{
    try {
        await TodoModel.findByIdAndUpdate({_id:id},payload)
        res.json({msg:"Todo has been updated"})
    } catch (err) {
      res.json({msg:err});
    }
  }

});

todoRouter.delete("/delete/:id",auth, async(req, res) => {
    let id = req.params.id;
    const todo = await TodoModel.findOne({"_id":id})
    if(req.body.userId!==todo.userId){
      res.json({msg:"You can not delete someone's post"});
    }else{
    try {
        await TodoModel.findByIdAndDelete({_id:id})
        res.json({msg:"Todo has been deleted"})
    } catch (err) {
      res.json({msg:err});
    }
  }
});

module.exports={todoRouter}

