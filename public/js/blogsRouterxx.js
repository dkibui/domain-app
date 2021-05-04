const express = require("express")
const viewController = require("../../controllers/viewController")
const router = express.Router()

router.get("/post-blog", viewController.createBlog)
router.post("/post-blog", viewController.postBlog)
router.put("/update-blog", viewController.updateBlog)
router.get("/edit", viewController.editBlog)

module.exports = router
