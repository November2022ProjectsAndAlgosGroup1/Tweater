const LikeController = require('../controllers/like.controller')
const { findAllLikes, findLike, addLike, removeLike } = LikeController

const ReplyController = require('../controllers/reply.controller')
const { findAllReplies, findReply, addReply, updateReply, deleteReply } = ReplyController

const RestaurantController = require('../controllers/restaurant.controller')
const { findAllRestaurants, findRestaurant, addRestaurant, updateRestaurant, deleteRestaurant } = RestaurantController

const TweatController = require('../controllers/tweat.controller')
const { addTweat, findTweat, findAllTweats, updateTweat, deleteTweat, retweat } = TweatController

const UserController = require('../controllers/user.controller')
const { deleteUser, findUser, findAllUsers, registerUser, updateUser, } = UserController


module.exports = (app) => {

    //like routes
    app.get('/api/likes/', findAllLikes) //finds all likes
    app.get('/api/likes/:id', findLike) //finds a single Like
    app.post('/api/likes/', addLike) //adds a Like to database
    app.delete('/api/likes/:id', removeLike) //removes a single Like

    //reply routes
    app.get('/api/replies/', findAllReplies) //finds all Replies
    app.get('/api/replies/:id', findReply) //finds a single Reply
    app.post('/api/replies/', addReply) //adds a Reply to database
    app.put('/api/replies/:id', updateReply) //updates a single Reply
    app.delete('/api/replies/:id', deleteReply) //updates a single Reply

    //restaurant routes
    // app.get('/api/restaurants/', findAllRestaurants) //finds all restaurants
    // app.get('/api/restaurants/:id', findRestaurant) //finds a single restaurant
    // app.post('/api/restaurants/', addRestaurant) //adds a restaurant to database
    // app.put('/api/restaurants/:id', updateRestaurant) //updates a single restaurant
    app.delete('/api/restaurants/:id', deleteRestaurant) //updates a single restaurant

    //tweat routes
    app.post('/api/tweats/', addTweat) //finds all tweats
    app.get('/api/tweats/:id', findTweat) //finds a single tweat
    app.get('/api/tweats/', findAllTweats) //adds a tweat to database
    app.put('/api/tweats/:id', updateTweat) //updates a single tweat
    app.delete('/api/tweats/:id', deleteTweat) //updates a single tweat
    /*need controller for retweat */ app.post('/api/tweats/:id', retweat)

    //user routes
    app.get('/api/users/', findAllUsers) //finds all users
    app.get('/api/users/:id', findUser) //finds a single user
    app.post('/api/users/', registerUser) //adds a user to database
    app.put('/api/users/:id', updateUser) //updates a single user
    app.delete('/api/users/:id', deleteUser) //updates a single user
}