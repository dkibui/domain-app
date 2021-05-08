const Blog = require("../models/Blog")
const { db } = require("../config/dbconfig")
const pool = db()

exports.viewBlog = (req, res) => {
  const id = req.params.id

  pool.query("SELECT * FROM blogs WHERE id=$1", [id], (err, results) => {
    if (!err) {
      // console.log(results.rows)
      res.render("blog", {
        blogs: JSON.stringify(results.rows),
        title: "Blog-> Visign",
      })
    } else {
      console.log("Error querying database")
    }
  })
}

exports.editBlog = (req, res) => {
  pool.query("SELECT * FROM blogs", (err, results) => {
    if (!err) {
      res.render("edit-blog", {
        blogs: JSON.stringify(results.rows),
        title: "Edit blogs-> Visign",
      })
    } else {
      console.log("Error querying database")
    }
  })
}

exports.createBlog = (req, res) => {
  res.render("post-blog", {
    title: "Create blog-> Visign",
    creator: "This is the create page",
  })
}

exports.updateBlog = (req, res) => {
  res.render("update-blog", {
    title: "Update blog-> Visign",
  })
}

exports.postBlog = (req, res) => {
  let blog = new Blog(req.body)
  blog.post()
  if (blog.errors.length) {
    res.send(blog.errors)
  } else {
    res.send("Congrats, no errors!")
  }
}
