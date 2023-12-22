const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('color')
const connectDb = require('./config/db')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000
connectDb()
const app = express()
app.use(bodyParser.json())
app.use(express.json())

app.use('/api/goals', require('./Routes/goalRoutes'))

app.listen(port, () => {
  console.log('Example app listening on port 3000!')
})
