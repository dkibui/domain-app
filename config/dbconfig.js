const pg = require("pg")
const { Pool } = require("pg")

exports.db = () => {
  // Create connection
  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "blogs",
    password: "3786",
    port: 5432,
  })
  return pool
}
