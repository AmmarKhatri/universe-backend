var createError = require('http-errors');
var express = require('express');
//intialized mongoose as Mongo ORM
const mongoose = require('mongoose');
//intialized express
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// connect to mongo db
let conString = "mongodb://"+process.env.MONGO_USER+":"+process.env.MONGO_PASS+"@mongod:"+process.env.MONGO_PORT+"/sample?authSource="+process.env.MONGO_USER+"&authMechanism=DEFAULT"
console.log("String =>", conString);
(async () => {
    try {
        await mongoose.connect(conString)
        console.log('Connection to mongo completed.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()
//compiling routers
const authRouter = require('./routes/user/router');
const communityRouter = require('./routes/community/router');
app.use('/community', communityRouter);
app.use('/user', authRouter);
//defaulting unknown routes to 404 (Not found)
app.use(function (req, res, next) {
    next(createError(404));
});

//listening on port
app.listen(process.env.PORT, console.log(`Server running on port: ${process.env.PORT}`));
