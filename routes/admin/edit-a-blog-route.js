const express = require("express")
const router = express.Router()

const { db } = require("../../config/dbconfig")
const pool = db()

router.get("/:id", (req, res) => {
  const id = req.params.id
  pool.query("SELECT * FROM blogs WHERE id=$1", [id], (err, results) => {
    if (!err) {
      // console.log(results.rows)
      res.render("edit-blog", {
        blogs: JSON.stringify(results.rows),
        title: "Blog-> Visign",
      })
    } else {
      console.log("Error querying database")
    }
  })
})

module.exports = router
