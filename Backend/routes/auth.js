var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
//const bcrypt = require("bcrypt");

router.post("/Registration", async (req, res, next) => {
  try {
    // parameters exists
    // valid parameters
    // username exists
    const users = await DButils.execQuery("SELECT email FROM users");
    if (users.length > 0) {
      if (users.find((x) => x.email === req.body.email))
        throw { status: 409, message: "Username taken" };
    }
    // add the new username

    let hash_password = bcrypt.hashSync(
      req.body.password,
      parseInt(process.env.bcrypt_saltRounds)
    );
    await DButils.execQuery(
      `INSERT INTO users VALUES (default, '${req.body.email}', '${hash_password}', '${req.body.firstname}', '${req.body.lastname}', 
      '${req.body.age}', '${req.body.sex}')`
    );
    res.status(201).send({ message: "user created", success: true });
  } catch (error) {
    next(error);
  }
});

router.post("/Login", async (req, res, next) => {
  try {
    // check that username exists
    const users = await DButils.execQuery("SELECT email FROM users");
    if (!users.find((x) => x.email === req.body.email))
      throw { status: 401, message: "Username or Password incorrect" };

    // check that the password is correct
    const user = (
      await DButils.execQuery(
        `SELECT * FROM users WHERE email = '${req.body.email}'`
      )
    )[0];

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      throw { status: 401, message: "Username or Password incorrect" };
    }
    // Set cookie
    req.session.user_id = user.user_id;

    // return cookie
    res.status(200).send({ message: "login succeeded", success: true });
  } catch (error) {
    next(error);
  }
});

router.post("/Logout", function (req, res) {
  req.session.reset(); // reset the session info --> send cookie when  req.session == undefined!!
  res.send({ success: true, message: "logout succeeded" });
});

module.exports = router;
