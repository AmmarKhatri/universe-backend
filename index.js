var createError = require("http-errors");
var express = require("express");
require("@tensorflow/tfjs");
const use = require("@tensorflow-models/universal-sentence-encoder");
require("dotenv").config();
const cors = require('cors')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
//intialized mongoose as Mongo ORM
const { Sequelize } = require("sequelize");
const mongoose = require("mongoose");
//intialized express
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
// connect to mongo db
let conString =
  "mongodb://" +
  process.env.MONGO_USER +
  ":" +
  process.env.MONGO_PASS +
  "@mongod:" +
  process.env.MONGO_PORT +
  "/sample?authSource=" +
  process.env.MONGO_USER +
  "&authMechanism=DEFAULT";
console.log("String =>", conString);
(async () => {
  try {
    await mongoose.connect(conString);
    console.log("Connection to mongo completed.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

// Load the Universal Sentence Encoder model
// let model;

async function loadModel() {
  try {
    model = await use.load();
    console.log('Model loaded.');
    return model;
  } catch(error) {
    console.error('Unable to load the model:', error);
    process.exit(1); // Exit the process with 'failure' code
  }
}

const sequelize = new Sequelize(
  process.env.PG_DB,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: "postgres",
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to PostgreSQL has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to PostgreSQL:", error);
  }
})();

//compiling routers
const authRouter = require("./routes/user/router");
const communityRouter = require("./routes/community/router");
const postRouter = require("./routes/post/router");
const commentRouter = require("./routes/comment/router");
const impressionRouter = require("./routes/impression/router");

app.use((req, res, next) => {
  if (model === undefined) {
    return res.status(503).send("Model not loaded yet.");
  }
  next();
});

app.use("/users", authRouter);
app.use("/communities", communityRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/impressions", impressionRouter);

//defaulting unknown routes to 404 (Not found)
app.use(function (req, res, next) {
  next(createError(404));
});

//listening on port
loadModel().then((res) => {
    // console.log("RES => ", res)
    app.locals.model = res;
  app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
});


