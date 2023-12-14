const { render } = require('ejs')
const express =require('express')
const { blogs } = require('./model/index')
const app=express()

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



//all blog
app.get('/',async (req,res)=>{

    //blogs table bata sabai data ley vaneko
    const allblogs = await blogs.findAll()
    console.log(allblogs)

        //blogs vanni ley ma allblogs ko data pass gareko ejs file lai
    res.render('blogs',{blogs:allblogs})
})

//create blog
app.get('/createblog',(req,res)=>{
   
    res.render('createBlog')
})


//create blog post

app.post('/createblog',async (req,res)=>{
    const title =req.body.title
    const description = req.body.description
    const subTitle =req.body.subTitle


    //second approachconst {title,description,subTitle}=req.body

//datbase ma halnu nikaln aparda atime lagni vayara aagadi async ra muni await halna parni hunxa
    await blogs.create({
        title:title,
        description:description,
        subTitle:subTitle,
    })
    res.redirect("/")
})


//singleblog page
        app.get("/single/:id",async(req,res)=>{
            
           const id = req.params.id

           //second approach garda ni hunxa
           //const {id}=req.params

           //specific mathi ko id ko data fectch garna paryo
            const blog =await blogs.findAll({
            where :{
                id:id
            }
           })
           //console.log(blog)
           res.render("singleBlog",{blog:blog})
        })


        //delete page


        app.get("/delete/:id",async(req,res)=>{
            const id=req.params.id

            //blogs table bata id ko delete gar vaneko jun value mathibata aayo tai value
            await blogs.destroy({
                where:{
                    id:id
                }
            })
            res.redirect("/")

        })
//EDIT
        app.get("/edit/:id",async(req,res)=>{
            const id= req.params.id
            //find blog of that id
          const blog= await blogs.findAll({
                where:{
                    id:id
                }
            })
            res.render("EditBlog",{blog:blog})

        })

        app.post("/EditBlog/:id",async(req,res)=>{
            const id =req.params.id
    //console.log(req.body)
        const title=req.body.title
        const subtitle=req.body.subTitle
        const description=req.body.description
        await blogs.update({
            title:title,
            subTitle:subtitle,
            description :description,
        },{
            where:{

                id:id
            }
        })
            res.redirect("/single/" +id)
})
        
app.listen(3000,()=>{
    console.log("NOdejs project has started at 3000")
})