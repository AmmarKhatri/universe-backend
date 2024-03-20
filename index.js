var createError = require('http-errors');
var express = require('express');
//intialized mongoose as Mongo ORM
const { Sequelize } = require('sequelize');
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
// PostgreSQL connection with Sequelize
const sequelize = new Sequelize(process.env.PG_DB, process.env.PG_USER, process.env.PG_PASSWORD, {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: 'postgres',
    logging: console.log,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to PostgreSQL has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to PostgreSQL:', error);
    }
})();
//compiling routers
const authRouter = require('./routes/user/router');
const communityRouter = require('./routes/community/router');
app.use('/communities', communityRouter);
app.use('/users', authRouter);
//defaulting unknown routes to 404 (Not found)
app.use(function (req, res, next) {
    next(createError(404));
});

//listening on port
app.listen(process.env.PORT, console.log(`Server running on port: ${process.env.PORT}`));
