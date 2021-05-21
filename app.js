const express = require("express")
const path = require("path")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT || 3000

//Markdown to html
const marked = require("marked")

const { db } = require("./config/dbconfig")
const { getMaxListeners } = require("process")
const pool = db()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
  })
})

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
  })
})

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact",
  })
})

//DISPLAY BLOGS
app.get("/blogs", (req, res) => {
  console.log("Display blogs request received")
  const sql = `SELECT * 
    FROM blogs 
    ORDER BY id DESC 
    LIMIT 25;`
  pool.query(sql, (err, results) => {
    if (!err) {
      let data = results.rows
      /* 
      console.log(results.rows)
      console.log(content)
      */
      data.forEach((blog) => {
        blog.content = marked(blog.content)
      })
      // console.log(data)
      res.render("showblogs", {
        blogs: JSON.stringify(data),
        title: "Blogs",
      })
    } else {
      console.log("Error querying database")
    }
  })
})

//CREATE BLOG
app.post("/admin/blogs/create", (req, res) => {
  console.log(req.body)
  const { author, category, title, summary, content } = req.body
  const sql = `INSERT INTO blogs 
    (category_id,author_id,title,summary,content) 
    VALUES ($1,$2,$3,$4,$5) 
    RETURNING id`
  const values = [author, category, title, summary, content]
  pool.query(sql, values, (err, results) => {
    if (err) {
      console.log("Error posting to database ->" + err)
    } else {
      console.log("Blog posted to database: " + results.rows[0])
      res.redirect("/admin/edit")
    }
  })
})

//UPDATE BLOG
app.get("/admin/edit", (req, res) => {
  const sql = `SELECT * 
  FROM blogs 
  ORDER BY id DESC
  LIMIT 30`
  pool.query(sql, (err, results) => {
    if (!err) {
      res.render("update-accordion", {
        blogs: JSON.stringify(results.rows),
        title: "Blogs",
      })
    } else {
      console.log("Error querying database")
    }
  })
})

app.put("/admin/update/:id", (req, res) => {
  console.log("Request to update received")
  const { id, author, category, title, summary, content } = req.body
  const values = [
    parseInt(category),
    parseInt(author),
    title,
    summary,
    content,
    parseInt(id),
  ]
  const sql = `UPDATE blogs 
    SET category_id=$1, author_id=$2, title = $3, summary = $4, content = $5 
    WHERE id = $6 
    RETURNING id`
  pool.query(sql, values, (err, results) => {
    if (!err) {
      res.send(results.rows[0])
    } else {
      console.log("Error querying database" + err)
    }
  })
})

//DELETE BLOG
app.delete("/admin/delete/:id", (req, res) => {
  const id = req.params.id
  const sql = `DELETE FROM blogs 
  WHERE id =$1 
  RETURNING id`
  pool.query(sql, [id], (err, results) => {
    if (!err) {
      // console.log(results.rows[0].id)
      res.send({ msg: results.rows[0].id })
    } else {
      console.log("Error querying database")
    }
  })
})

//SERVER LISTEN FOR REQUESTS
app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`)
})
