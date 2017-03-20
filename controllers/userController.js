var passwordHash = require('password-hash');
var userController = function(Users){
    var post = function(req,res){
        var hashedPassword = passwordHash.generate(req.body.password);
        var email = req.body.email;
        var name = req.body.name;
       var userInfo =  {
        "name":name,
        "email": email,
        "password":hashedPassword
    }
        var user = new Users(userInfo);
        user.save();
       //res.status(200).send(req.body);
       res.status(200).send(user);
    }
    var get = function(req,res){
        var query = {};
        /*if(req.query.genre){
            query.genre = req.query.genre;
        }*/
        Users.find(function(err,user){
            if(err){
                console.log(err);
            }else{
                res.json(user);
            }
        });
    }
        return {
            post:post,
            get:get
        }
    }
module.exports = userController;