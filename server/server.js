const PORT = 8000
const cors = require('cors')
const express = require('express')
const app = express()
require('dotenv').config()
const cookieParser = require('cookie-parser')

//require config file
require('./config/mongoose.config')

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

//start server
app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})


