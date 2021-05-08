const validator = require("validator")
const { db } = require("../config/dbconfig")
const pool = db()

class Blog {
  constructor(data) {
    this.data = data
    this.errors = []
  }
  //author, category, title, summary, content
  //Validate user input for the blog post
  cleanUp() {
    this.data = {
      author: this.data.category.trim(),
      category: this.data.category.trim(),
      title: this.data.title.trim(),
      summary: this.data.summary.trim(),
      content: this.data.content.trim(),
    }
  }

  validate() {
    if (this.data.title == "") {
      this.errors.push("You must provide a blog title")
    }
    if (this.data.title !== "" && !validator.isAlphanumeric(this.data.title)) {
      this.errors.push("Blog title should only contain letters and numbers")
    }

    if (this.data.summary == "") {
      this.errors.push("You must provide a blog summary")
    }

    if (this.data.content == "") {
      this.errors.push("You must insert blog content")
    }
  }

  post() {
    //Step #1: Validate blog data
    this.cleanUp()
    this.validate()
    console.log(this.data)

    //Step #2: Only if there are no validation errors save blog to the database

    const { author, category, title, summary, content } = this.data
    let qry =
      "INSERT INTO blogs (author_id, category_id, title, summary, content) VALUES ($1,$2,$3,$4,$5) RETURNING id"
    let values = [parseInt(author), parseInt(category), title, summary, content]

    if (!this.errors.length) {
      pool.query(qry, values, (err, results) => {
        if (!err) {
          console.log(`Row id ${results.rows[0].id} inserted to blogs`)
        } else {
          return console.error(err.message)
        }
      })
    } else {
      console.log("There are some errors in the input")
    }
  }
}

module.exports = Blog
