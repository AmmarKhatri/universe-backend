const {Sequelize} = require('sequelize');
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

const models = {
    PostCounter: require('./PostCounter')(sequelize, Sequelize.DataTypes),
    PostImpression: require('./PostImpression')(sequelize, Sequelize.DataTypes),
    CommentImpression: require('./CommentImpression')(sequelize, Sequelize.DataTypes),
    CommentCounter: require('./CommentCounter')(sequelize, Sequelize.DataTypes),
};

module.exports = models;