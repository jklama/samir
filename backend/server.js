const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const connectDb = require('./config/db')
connectDb()
const port = process.env.PORT || 3000
const app = express()

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
