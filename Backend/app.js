var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("client-sessions");
const cors = require("cors");
var nodemailer = require("nodemailer");

var serveStatic = require('serve-static');

var authRouter = require("./routes/auth");
var usersRouter = require("./routes/users");
var imagesRouter = require("./routes/images");
var adminsRouter = require("./routes/admins");

var app = express();

let reqPath = path.join(__dirname, '../Frontend/dist');
app.use(serveStatic(reqPath));

const port = "8110";
// const port = process.env.PORT || "3000";


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));


// app.use(express.static(reqPath));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(reqPath, "index.html"))
// })

//#setting cors
const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
//#setting cookies configuration
app.use(
  session({
    cookieName: "session", // the cookie key name
    secret: "blargadeeblargblarg", // the encryption key
    duration: 30 * 60 * 1000, // expired after 30 sec
    activeDuration: 30, // if expiresIn < activeDuration,
    //the session will be extended by activeDuration milliseconds
    cookie: {
      httpOnly: false,
      // ephemeral: true, //when true, cookie expires when the browser closes
    },
  })
);

app.use('', authRouter);
app.use('', usersRouter);
app.use('', imagesRouter);
app.use('', adminsRouter);

/* GET home page. */
app.get("/", function (req, res, next) {
  res.render("index", { title: "Project" });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const host = '0.0.0.0';
//open server
// const server = app.listen(port, host); 
// console.log(`Server listen on port ${port}`);

// const server = app.listen(host, port, // host); 
//   () => {
//   console.log(`Server listen on port ${port}`);
// });

const server = app.listen(port, host, function (err) {
  if (err) {
   console.log(err)
   return
  }
  console.log('Listening at ' + host + ":" + port + '\n')
 })

process.on("SIGINT", function () {
  if (server) {
    server.close(() => console.log("server closed"));
  }
  process.exit();
});

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "youremail@gmail.com",
    pass: "yourpassword",
  },
});

module.exports = app;
