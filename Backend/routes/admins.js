var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const adminUtils = require("./utils/adminUtils");

//#region cookie middleware
var adminSessionChecker = (req, res, next) => {
  if (req.session && req.session.emailAdmin) {
    console.log('already logged in');
    console.log(req.session.emailAdmin);
    req.emailAdmin = req.session.emailAdmin;
    next();
  } else {
    res.status(401);
    res.redirect('/loginManagement');
  }    
};

//#region cookie middleware
// router.use(async function (req, res, next) {
//     if (req.session && req.session.emailAdmin) {
//       await DButils.execQuery("SELECT * FROM admins")
//         .then((users) => {
//           if (users.find((x) => x.email === req.session.emailAdmin)) {
//             req.emailAdmin = req.session.emailAdmin;
//           }
//           next();
//         })
//         .catch((error) => next());
//     } else {
//       res.status(401).send("admin does not exist!");
//     }
//   });
  //#endregion

router.get('/admins/getUsers', adminSessionChecker, (req, res, next) => {
  adminUtils.getUsersInSystem().then((info_array) => {
    if (info_array.length == 0)
      res.status(205).send({ message: "No Users found", success: true });
    else res.send(info_array);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
  });

router.get('/admins/getParams', adminSessionChecker, (req, res, next) => {
    adminUtils.getParams().then((info_array) => {
      if (info_array.length == 0)
        res.status(205).send({ message: "No Parameters found", success: true });
      else res.send(info_array);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
    });

router.get('/admins/updateParams/:params', adminSessionChecker, (req, res, next) => {
    const allParams=JSON.parse(req.params.params);
    adminUtils.updateParams(allParams).then((info_array) =>res.send(info_array))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
    });

router.get('/admins/getImagesId', adminSessionChecker, (req, res, next) => {
    adminUtils.getImagesId().then((info_array) => {
      if (info_array.length == 0)
        res.status(205).send({ message: "No Images found", success: true });
      else res.send(info_array);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
    });

router.get('/admins/getImagesId', adminSessionChecker, (req, res, next) => {
    adminUtils.getImagesId().then((info_array) => {
      if (info_array.length == 0)
        res.status(205).send({ message: "No Images found", success: true });
      else res.send(info_array);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
    });

router.get('/admins/getImagesId', adminSessionChecker, (req, res, next) => {
    adminUtils.getImagesId().then((info_array) => {
      if (info_array.length == 0)
        res.status(205).send({ message: "No Images found", success: true });
      else res.send(info_array);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
    });

router.get('/admins/getImagesRatedByUsers', adminSessionChecker, (req, res, next) => {
  adminUtils.getImagesRatedByUsers().then((info_array) => {
    if (info_array.length == 0)
      res.status(205).send({ message: "No Images found", success: true });
    else res.send(info_array);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
  });

router.get('/admins/getImagesRated', adminSessionChecker, (req, res, next) => {
  adminUtils.getImagesRated().then((info_array) => {
    if (info_array.length == 0)
      res.status(205).send({ message: "No Images found", success: true });
    else res.send(info_array);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
  });

router.put('/admins/changeStatus/:email', adminSessionChecker, (req, res, next) => {
  adminUtils.changeStatus(req.params.email).then((info_array) => {
    if (info_array.length == 0)
      res.status(205).send({ message: "No User found", success: true });
    else res.send(info_array);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
  });

router.put('/admins/allUsersInDeactiveStatus', adminSessionChecker, (req, res, next) => {
  adminUtils.deactiveAllUsers().then((info_array) => {
    if (info_array.length == 0)
      res.status(205).send({ message: "No Users found", success: true });
    else res.send(info_array);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
  });

router.put('/admins/allUsersInActiveStatus', adminSessionChecker, (req, res, next) => {
  adminUtils.activeAllUsers().then((info_array) => {
    if (info_array.length == 0)
      res.status(205).send({ message: "No Users found", success: true });
    else res.send(info_array);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
  });

router.put('/changePlayAdvancedGame/:email', adminSessionChecker, (req, res, next) => {
  adminUtils.changePlayAdvancedGame(req.params.email).then((info_array) => {
    if (info_array.length == 0)
      res.status(205).send({ message: "No User found", success: true });
    else res.send(info_array);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
  });
module.exports = router;