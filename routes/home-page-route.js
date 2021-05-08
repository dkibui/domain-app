const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.render("index", {
    title: "Home-> Visign",
    creator: "This was created by me!",
  })
})

module.exports = router
