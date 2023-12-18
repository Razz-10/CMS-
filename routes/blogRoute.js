const { renderCreateBlog, allBlog, createBlog, singleBlog, deleteBlog, rendereditBlog, editBlog } = require("../controller/blog/blog.Controller")

const router =require("express").Router()
//kohi crate blog ma gayo vaney kgarney vanekoho hai


// app.get("/createblog",renderCreateBlog)
// app.post("/createblog",createBlog)  samr  asbelow 

router.route("/").get(allBlog)
router.route("/createBlog").get(renderCreateBlog).post(createBlog)

router.route("/single/:id").get(singleBlog)
router.route("/delete/:id").get(deleteBlog)
router.route("/edit/:id").get(rendereditBlog)
router.route("/EditBlog/:id").post(editBlog)



   //we can dothis also
//router.route("/:id").get(singleBlog).post(editBlog)



module.exports=router;