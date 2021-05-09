var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const userUtils = require("./utils/userUtils");

//#region cookie middleware
var sessionChecker = (req, res, next) => {

  // if (req.session && req.session.email) {
  //       await DButils.execQuery("SELECT * FROM users")
  //         .then((users) => {
  //           if (users.find((x) => x.email === req.session.email)) {
  //             req.email = req.session.email;
  //             console.log("ifff");
  //           }
  //           next();
  //         })
  //         .catch((error) => next());
  //     } else {
  //       res.status(401).send("user ??? does not exist!");
  //     }
  if (req.session && req.session.email) {
    console.log('already logged in');
    console.log(req.session.email);
    req.email = req.session.email;
    next();
  } else {
    res.status(401);
    res.redirect('/Login');
  }    
};


// router.use(async function (req, res, next) {
//   if (req.session && req.session.email) {
//     await DButils.execQuery("SELECT * FROM users")
//       .then((users) => {
//         if (users.find((x) => x.email === req.session.email)) {
//           req.email = req.session.email;
//         }
//         next();
//       })
//       .catch((error) => next());
//   } else {
//     res.status(401).send("user ??? does not exist!");
//   }
// });
//#endregion

router.get('/users/getImageToRate', sessionChecker, (req, res, next) => {
userUtils.getRandomImageToRate(req.email).then((info_array) => {
  if (info_array.length == 0)
    res.status(201).send({ message: "No image found", success: true });
  else res.send(info_array);
})
.catch((error) => {
  console.log(error);
  res.sendStatus(500);
});
});

router.get('/users/saveRate/image/:image_id/rate/:valueRate', sessionChecker, (req, res, next) => {
  const {image_id, valueRate} = req.params;
  //console.log(req.email);
  params = {};
  params.image_id = image_id;
  params.valueRate = valueRate;
  console.log(params);
  userUtils.saveRate(req.email, params);
  res.sendStatus(200);
  });
  

  router.get('/users/getImagesForGame/amount/:num/numOfScreens/:screens/numOfSelected/:selected', sessionChecker, (req, res, next) => {
    console.log(req.params);
    userUtils.getGameImages(req.email, req.params)
    .then((info_array) => {
      if (info_array.length == 0)
        res.status(205).send({ message: "No images found", success: true });
      else{
        res.status(200).send(info_array);
      } 
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });  
  });

router.get('/users/saveScoreScreen/gameID/:gameID/numOfScreen/:screenNum/imagesSelect/:images/score/:scoreScreen', sessionChecker, (req, res, next) => {
  console.log(req.params);
  userUtils.saveScoreScreen(req.params);
  res.sendStatus(200);
});

router.get('/users/saveScoreGame/gameID/:gameID/score/:score', sessionChecker, (req, res, next) => {
  console.log(req.params);
  userUtils.saveScoreGame(req.email, req.params);
  res.sendStatus(200);
});

router.get('/users/numberOfImages', sessionChecker, (req, res, next) => {
  userUtils.getNmberOfImages(req.email).then((info_array) => {
    if (info_array.length < 0){
      res.status(205).send({ message: "No image found", success: true });
    }
    else res.send(info_array);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
  });

router.get('/users/getAllParams', sessionChecker, (req, res, next) => {
  userUtils.getAllParams().then((info_array) => {
    if (info_array.length < 0){
      res.status(205).send({ message: "No number found", success: true });
    }
    else res.send(info_array);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
  });

router.get('/users/checkIfPlayToday', sessionChecker, (req, res, next) => {
  console.log(req.email);
  userUtils.checkIfPlay(req.email).then((info_array) => {
    if (info_array.length == 0){
      res.status(200).send({ message: "The user has not played today", success: true });
    }
    else res.status(201).send(info_array);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
  });

router.get('/users/getScreensGame/gameId/:id', sessionChecker, (req, res, next) => {
  userUtils.getScreensGame(req.params).then((info_array) => {
    if (info_array.length < 0){
      res.status(205).send({ message: "No number found", success: true });
    }
    else res.send(info_array);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
  });

router.get('/users/getScoreScreens/gameId/:id', sessionChecker, (req, res, next) => {
  userUtils.getScoreScreens(req.params).then((info_array) => {
    if (info_array.length < 0){
      res.status(205).send({ message: "No number found", success: true });
    }
    else res.send(info_array);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
  });

router.get('/users/getImagesForAdvancedGame', sessionChecker, (req, res, next) => {
  userUtils.getImagesForAdvancedGame(req.email).then((info_array) => {
    if (info_array.length < 0){
      res.status(205).send({ message: "No game found", success: true });
    }
    else if(info_array.length == 0)
      res.status(201).send({ message: "No game found", success: false });
    else res.send(info_array);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
  });

router.get('/users/saveScoreScreenAdvanced/gameID/:gameID/numOfScreen/:screenNum/imagesSelect/:images/score/:scoreScreen', sessionChecker, (req, res, next) => {
  console.log(req.params);
  userUtils.saveScoreScreenAdvanced(req.params);
  res.sendStatus(200);
});

router.get('/users/saveScoreAdvancedGame/gameID/:gameID/score/:score', sessionChecker, (req, res, next) => {
  console.log(req.params);
  userUtils.saveScoreAdvancedGame(req.email, req.params);
  res.sendStatus(200);
});
router.get('/users/getTop10', (req, res) => {
  userUtils.getTop10().then((info_array) => {
    if (info_array.length < 0){
      res.status(205).send({ message: "No Users found", success: true });
    }
    else res.send(info_array);
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
  });

  
module.exports = router;
