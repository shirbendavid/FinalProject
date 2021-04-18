var createError = require("http-errors");
var express = require("express");
//var multer = require('multer');
//var fileUpload = require('express-fileupload');
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("client-sessions");
const cors = require("cors");
var nodemailer = require("nodemailer");

var authRouter = require("./routes/auth");
var usersRouter = require("./routes/users");
var imagesRouter = require("./routes/images");
var adminsRouter = require("./routes/admins");
//var upload = multer({dest:"C:/Users/User"+'/uploads/images'});
var app = express();
const port = process.env.PORT || "3000";
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
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
    activeDuration: 0, // if expiresIn < activeDuration,
    //the session will be extended by activeDuration milliseconds
    cookie: {
      httpOnly: false,
      // ephemeral: true, //when true, cookie expires when the browser closes
    },
  })
);

app.use("/", authRouter);
app.use("/users", usersRouter);
app.use("/images", imagesRouter);
app.use("/admins", adminsRouter);

/* GET home page. */
app.get("/", function (req, res, next) {
  res.render("index", { title: "Project" });
});

// upload image
// app.post('/upload', upload.array('photo'), (req, res) => {
//   if(req.file) {
//       res.json(req.file);
//   }
//   else throw 'error';
// });

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

//open server
const server = app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});

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
