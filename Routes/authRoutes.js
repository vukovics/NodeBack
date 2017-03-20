var express = require('express');
var routes = function(Users){
    var authRouter = express.Router();
    //controller
    var authController = require('./../controllers/authController')(Users);
authRouter.route('/')
    .post(authController.post)
    return authRouter;     
};
module.exports = routes;