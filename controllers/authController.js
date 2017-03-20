var jwt = require('jsonwebtoken');
var authController = function(Users){
    var post = function(req,res){
       Users.findOne({
            email: req.body.email
       }, function(err, user){
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: 'Authentication failed. Wrong email / password' });
            }
            if (user.email == req.body.email) {
                var token = jwt.sign(user, 'superSecret', {
                    expiresIn: '1h',
                    });
                // return the information including token as JSON
                res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
                });
            }
        });
    }
         return {
            post:post
        }
    }
module.exports = authController;