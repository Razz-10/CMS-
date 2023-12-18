const { users } = require("../../model")
const bcrypt =require("bcrypt")
const jwt =require("jsonwebtoken")


exports.renderregisterUser = (req,res)=>{
    res.render("register")
}
exports.registerUser =async(req,res)=>{
    const {email,username,password,confirmPassword}=req.body
    //const email =req.body.email
  
    //INsert into table


    if(password.toLowerCase() != confirmPassword.toLowerCase()){
        return res.send("Password  and confirm password doesnt matched")
    }

    await users.create({

        email:email,
        username:username,
        password: bcrypt.hashSync(password,8)
    })
    res.redirect("/login")

}

//lOGIN controller form here

exports.renderLoginForm =(req,res)=>{
    res.render("login")
}

//login handel garni funcion
exports.loginUser =async(req,res)=>{
    //servr side validation
    const {email,password}=req.body
    if(!email ||!password){
        return res.send("Email and password are required")
    }

    //check if  that email exits or not

    const associatedDataiWithEmail =await users.findAll({
        where:{
            email
        }
    })
    if(associatedDataiWithEmail.length ==0){
        res.send("User with that email doesnt exists")
    }
    else{
        const associatedEmailPassword = associatedDataiWithEmail[0].password
        const isMatched = bcrypt.compareSync(password,associatedEmailPassword)//true or dalse return
        if(isMatched){

            //GENEREATE TOKEn HERE 
          const token =jwt.sign({id:associatedDataiWithEmail[0].id},process.env.SECRETKEY,{
            expiresIn :"20d"
        }) 
            res.cookie('token',token)//brower ma application tab vitra cookie vanney ma save 
            
            res.send("Logged in Sucess")


        }else{
        res.send("Invalid password")
    }
    
    }
}