const PORT = 8000
const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const cookieParser = require('cookie-parser')

//require config file
const mongoose = require('./config/mongoose.config')

//Middleware for formatting and allowing POST requests
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

//connect front-end to back-end
app.use(
    cors({
        origin: "http://localhost:3000", credentials: true
    }),
)

// import routes
require('./routes/app.routes')(app)
require('./routes/user.routes')(app)
require('./routes/tweat.routes')(app)

//Serve the static file (Documentation: https://expressjs.com/en/starter/static-files.html)
const path = require('path')
app.use('/images', express.static(path.join(__dirname, 'images')))

//start server
app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})


