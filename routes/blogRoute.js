const { renderCreateBlog, allBlog, createBlog, singleBlog, deleteBlog, rendereditBlog, editBlog, renderMyblogs } = require("../controller/blog/blog.Controller")
const { isAuthenticated } = require("../middleware/isAuthenticated")

const router =require("express").Router()
const {multer,storage} =require("../middleware/multerConfig");
const upload =multer({storage:storage});
//kohi crate blog ma gayo vaney kgarney vanekoho hai


// app.get("/createblog",renderCreateBlog)
// app.post("/createblog",createBlog)  samr  asbelow 

router.route("/").get(allBlog)
router.route("/createBlog").get(renderCreateBlog).post(isAuthenticated,upload.single('image'),createBlog)

router.route("/single/:id").get(singleBlog)
router.route("/delete/:id").get(isAuthenticated,deleteBlog)
router.route("/edit/:id").get(isAuthenticated,rendereditBlog)
router.route("/EditBlog/:id").post(isAuthenticated,editBlog)
router.route("/myblogs").get(isAuthenticated,renderMyblogs)



   //we can dothis also
//router.route("/:id").get(singleBlog).post(editBlog)



module.exports=router;