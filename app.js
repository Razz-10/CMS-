const { render } = require('ejs')
const express =require('express')
const { blogs } = require('./model/index')
const { renderCreateBlog, createBlog, singleBlog, rendereditBlog, deleteBlog, editBlog, allBlog } = require('./controller/blog/blog.Controller')
const app=express()

require('dotenv').config() ///requiring dotenv nd initiliazing it with default configuration


//ROutes here
const blogRoute =require("./routes/blogRoute")

const authRoute =require("./routes/authRoute")

//database connection
require("./model/index")


//telling the nodejs to set

app.set('view engine','ejs')


//nodejs lai file use garna dey vaneko
app.use(express.static("public/"))
app.use(express.static("hello/"))


//form bata data aairaxa handel gar or parse gar
app.use(express.json())
app.use(express.urlencoded({extended:true}))




app.use("",blogRoute) //local host :3000 +/createBlog ===localhost:3000/createBlog
//app.use("/hello",blogRoute)//localhost:3000/hello+createblog===localhost:3000/hello/createblog

app.use("",authRoute)//localhost:3000+authRoute i.e regisetr

// app.get('/portfolio',(req,res)=>{
//     const myData = [
//         {
//             name:"raj tuladhar",
//             whoiam :"student",
//         }
//     ]
//     res.render('index.ejs',{myData})

// })

// app.get('/')



// //all blog
//         app.get('/',allBlog)


// //singleblog page
//         app.get("/single/:id",singleBlog)

//         //delete page

//         app.get("/delete/:id",deleteBlog)
// //EDIT
//         app.get("/edit/:id",rendereditBlog)

//         app.post("/EditBlog/:id",editBlog)
        
app.listen(3000,()=>{
    console.log("NOdejs project has started at 3000")
})


//to clear git cached
//git rm -r --cached node_modules (foldername)