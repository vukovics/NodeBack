var express = require('express');
var routes = function(Users){
    var userRouter = express.Router();
    //controller
    var userController = require('./../controllers/userController')(Users);
    userRouter.route('/')
    .get(userController.get)
   .post(userController.post);
    userRouter.use('/:userId', function(req,res,next){
     Users.findById(req.params.userId,function(err,book){
            if(err){
                console.log(err);
            }else if(book){
                req.book = book;
                next();
            }else{
                res.status(404).send('No book found.');
            }
            });
        });
    userRouter.route('/:userId')
        .get(function(req,res){
            res.json(req.book);
        })
        .put(function(req,res){
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.save(function(err){
            if(err){
                res.status(500).send(err);
            }else{
                res.json(req.book);
            }
        });
    })
    .patch(function(req,res){
        if(req.body._id)
            delete req.body._id;
        
        for(var p in req.body){
            req.book[p]=req.body[p];
        }

        req.book.save(function(err){
            if(err){
                res.status(500).send(err);
            }else{
                res.json(req.book);
            }

        });

    })
    .delete(function(req,res){
        req.book.remove(function(err){
            if(err){
                res.status(500).send(err);
            }else{
                res.status(204).send('Removed!');
            }
        });
    });
    return userRouter;     
};
module.exports = routes;