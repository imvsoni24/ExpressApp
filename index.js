const express = require("express");
const { connection } = require("./configs/db");
const {userRouter} = require("./routes/user.route")
const {todoRouter} = require("./routes/todo.route")

const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to my Todo app")
})
app.use("/user",userRouter)

app.use("/todo",todoRouter)

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Server is running and connected to db")

    }catch(err){
        console.log(err)
    }

})