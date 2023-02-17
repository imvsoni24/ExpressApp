const express = require("express")
const bcrypt = require("bcrypt");
const userRouter = express.Router()
const {UserModel} = require("../models/user.model")

var jwt = require("jsonwebtoken");

userRouter.post("/register",async(req,res)=>{
    const {name,email,password} = req.body;
    const user = await UserModel.findOne({email});
    if(user){
        res.json({message:"You have already an account please login"})
    }else{
    try{
     bcrypt.hash(password, 5, async(err, hash) =>{
       if(err){
        res.send(err)
       }
        let user = new UserModel({name,email,password:hash});
        await user.save();
        res.json({message:"Your account has been created please login"})
     });
    }catch(err){
        res.status(500).send(err.message);
    }
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try{
    const user = await UserModel.findOne({email})
    if(user){
        bcrypt.compare(password, user.password, function (err, result) {
          if(result){
            const token = jwt.sign({ userId:user._id,author:user.email }, "imv");
            if (token) {
              jwt.verify(token, "imv", (err, decoded) => {
                if (decoded) {
                   res.json({
                     msg: "You are succesfully logged in",
                     token: token,
                     email: decoded.author,
                   });
                }
              });
            }
           
          }else{
            res.json({msg:"User credentials are wrong"});
          }
        });
    }else{
        res.json({msg:"Please create your account first"})
    }

    }
    catch(err){
        res.send(err.message)
    }

})

module.exports={userRouter}