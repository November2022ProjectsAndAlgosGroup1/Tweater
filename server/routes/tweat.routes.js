const TweatController = require("../controllers/tweat.controller");
const { addTweat, findTweat, findAllTweats, updateTweat, deleteTweat, retweat, } = TweatController;
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images')
    },
    filename: function (req, file, cb) {
        console.log("original filename is:" + file.originalname)
        cb(null, Date.now() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

let upload = multer({ storage, fileFilter })

module.exports = (app) => {

    //tweat routes
    app.post("/api/tweats/", upload.single('image'), addTweat); //adds a tweat to database
    app.get("/api/tweats/:id", findTweat); //finds a single tweat
    app.get("/api/tweats/", findAllTweats); //finds all tweats
    app.put("/api/tweats/:id", updateTweat); //updates a single tweat
    app.delete("/api/tweats/:id", deleteTweat); //deletes a single tweat
    // /*need controller for retweat */ app.post('/api/tweats/:id', retweat)
}