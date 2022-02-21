var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

var { verifyToken } = require("./middlewares/authJWT");

var indexRouter = require("./routes/index");
var sqlIndexLunar = require("./sql/index_lunar");
var sqlUsers = require("./sql/users");
var registerRouter = require("./routes/register");
var loginRouter = require("./routes/login");
var app = express();
var cors = require("cors");
// view engine setup
/* ===================== | 'CORS OPTIONS' | ===================== */
const corsOptions = {
    origin: process.env.CORS_HOST,
};
app.use(cors(corsOptions));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//--------- SQL Index Lunar
app.use("/database", sqlIndexLunar);
app.use("/database", sqlUsers);

/* ===================== | 'REGISTER ROUTE' | ===================== */
app.use("/register", registerRouter);
/* ===================== | 'LOGIN ROUTE' | ===================== */
app.use("/login", loginRouter);

app.use("/auth", verifyToken, indexRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

/* ===================== | 'ERROR HANDLER' | ===================== */
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500).send(err.message);
});

module.exports = app;
