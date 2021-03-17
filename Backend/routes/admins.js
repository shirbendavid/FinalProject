var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const adminUtils = require("./utils/adminUtils");

//#region cookie middleware
router.use(async function (req, res, next) {
    if (req.session && req.session.emailAdmin) {
      await DButils.execQuery("SELECT * FROM admins")
        .then((users) => {
          if (users.find((x) => x.email === req.session.emailAdmin)) {
            req.emailAdmin = req.session.emailAdmin;
          }
          next();
        })
        .catch((error) => next());
    } else {
      res.sendStatus(401);
    }
  });
  //#endregion

  router.get('/getUsers', (req, res) => {
    adminUtils.getUsersInSystem().then((info_array) => {
      if (info_array.length == 0)
        res.status(205).send({ message: "No users found", success: true });
      else res.send(info_array);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
    });

    module.exports = router;