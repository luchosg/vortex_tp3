const db = require('mysql2-promise')();
const dotEnv = require('dotenv');
dotEnv.config();

const config = {
    host : process.env.HOST,
    database : process.env.DB_NAME,
    user : process.env.DB_USER
};

db.configure(config);
module.exports = db;