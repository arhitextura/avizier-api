require("dotenv").config();
const { application } = require("express");
const mysql = require("mysql");

var pool = mysql.createPool({
    connectionLimit: 25,
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    multipleStatements: true,
});

pool.on("connection", function (connection) {
    console.log("Connection %d acquired", connection.threadId);
});

module.exports = pool;
