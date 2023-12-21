const jwt = require("jsonwebtoken")
//const promisify =require("util").promisify
const {promisify}=require("util")
const { users } = require("../model")

exports.isAuthenticated =async(req,res,next)=>{
    const token = req.cookies.token
    //check if token given or not
    if(!token){
        //return res.send("YOu must be login")
        return res.redirect("/login")
    }


    //verify token if it is ligit or not
       const decryptedResult= await promisify(jwt.verify)(token,process.env.SECRETKEY)
        //console.log(decryptedResult)

        //check if thet id(userID) users table ma exits x avanera

        const usersExits =await users.findAll({
            where:{
                id :decryptedResult.id
            }
        })
        if(usersExits.length ==0){
            //res.send("User doesnt exits")
            res.redirect("/register")
        }
        else{
            req.user= usersExits;
            req.userId =usersExits[0].id
            
            //alternative decryptedResult.id
            next()    
        }



}