var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var db = mongoose.connect('mongodb://localhost/bookAPI');

//app.set('superSecret', 'superSecret'); // secret variable

//Models
var Book = require('./models/bookModel');
var Users = require('./models/userModel');
//Server
var app = express();
var port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//Routes
bookRouter = require('./Routes/bookRoutes')(Book);
userRouter = require('./Routes/userRoutes')(Users);
authRouter = require('./Routes/authRoutes')(Users);

app.use('/api/books', bookRouter);
app.use('/api/login', userRouter);
app.use('/api/auth', authRouter);
app.get('/', function(req, res){
       res.send('welcome');
});

app.listen(port,function(){
    console.log('Starting server on port 3000');
});