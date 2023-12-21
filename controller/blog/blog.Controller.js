const { blogs, users } = require("../../model")



exports.allBlog=async (req,res)=>{

    //blogs table bata sabai data ley vaneko
    const allblogs = await blogs.findAll()
    
   
    // const allblogs = await blogs.findAll({
    //     include: 
    //         {
    //         model:users,//USER->TableName
    //     }
    
    // })
    //console.log(allblogs)

        //blogs vanni ley ma allblogs ko data pass gareko ejs file lai
    res.render('blogs',{blogs:allblogs})
}


exports.renderCreateBlog =(req,res)=>{
    res.render('createBlog')
}


exports.createBlog=async (req,res)=>{


    const filename=req.file.filename
    const userID=req.user[0].id

    const title =req.body.title
    const description = req.body.description
    const subTitle =req.body.subTitle

    if(!title||!description||!subTitle||!req.file){
        return res.send("Please Provide title,description,subTitile,file")
    }
    


    //second approachconst {title,description,subTitle}=req.body

//datbase ma halnu nikaln aparda atime lagni vayara aagadi async ra muni await halna parni hunxa
    await blogs.create({
        title:title,
        description:description,
        subTitle:subTitle,
        userId:userID,
        image: process.env.PROJECT_URL + filename
        //userId:req.userID 
    })
    res.redirect("/")
}

exports.singleBlog=async(req,res)=>{
            
           const id = req.params.id

           //second approach garda ni hunxa
           //const {id}=req.params

           //specific mathi ko id ko data fectch garna paryo
            const blog =await blogs.findAll({
            where :{
                id:id
            },
            include :{
                model : users
            }
           })
           //console.log(blog)
           res.render("singleBlog",{blog:blog})
}
    
        exports.deleteBlog=async(req,res)=>{
            const id=req.params.id

            //blogs table bata id ko delete gar vaneko jun value mathibata aayo tai value
            await blogs.destroy({
                where:{
                    id:id
                }
            })
            res.redirect("/")

        }

        exports.rendereditBlog=async(req,res)=>{
            const id= req.params.id
            //find blog of that id
          const blog= await blogs.findAll({
                where:{
                    id:id
                }
            })
            res.render("EditBlog",{blog:blog})

        }

        exports.editBlog =async(req,res)=>{
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

        }
        exports.renderMyblogs=async(req,res)=>{

            //get this users blog 
            const userId =req.userId;
            //find blog of this userId
            const myBlogs= await blogs.findAll({
                where : {
                    userId :userId
                }
            })
               res.render("myBlogs.ejs",{myBlogs:myBlogs})
           }


