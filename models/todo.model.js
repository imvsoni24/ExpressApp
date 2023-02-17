const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    title:String,
    description:String,
    status:{type:Boolean,default:false},
    userId:String,
    author:String
})

const TodoModel = mongoose.model("todo",todoSchema)

module.exports={TodoModel}