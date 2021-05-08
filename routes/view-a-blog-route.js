const express = require("express")
const router = express.Router()

const { db } = require("../config/dbconfig")
const pool = db()

module.exports = router
