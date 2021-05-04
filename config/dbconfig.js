const pg = require("pg")
const { Pool } = require("pg")
require("dotenv").config()

exports.db = () => {
  // Create connection
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
  })
  return pool
}
