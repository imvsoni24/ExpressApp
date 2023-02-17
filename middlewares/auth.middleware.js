const jwt = require("jsonwebtoken");
const auth = (req,res,next)=>{
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, "imv", (err, decoded)=> {
            if (decoded) {
              req.body.userId = decoded.userId;
              req.body.author=decoded.author
              next();
            } else {
              res.json({msg:err});
            }
        });
    }else{
         res.json({msg:"Please login first"});
    }

}

module.exports={auth}