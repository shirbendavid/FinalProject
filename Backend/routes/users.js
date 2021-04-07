var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const userUtils = require("./utils/userUtils");

//#region cookie middleware
router.use(async function (req, res, next) {
  if (req.session && req.session.email) {
    await DButils.execQuery("SELECT * FROM users")
      .then((users) => {
        if (users.find((x) => x.email === req.session.email)) {
          req.email = req.session.email;
        }
        next();
      })
      .catch((error) => next());
  } else {
    res.sendStatus(401);
  }
});
//#endregion

router.get('/getImageToRate', (req, res) => {
userUtils.getRandomImageToRate(req.email).then((info_array) => {
  if (info_array.length == 0)
    res.status(205).send({ message: "No image found", success: true });
  else res.send(info_array);
})
.catch((error) => {
  console.log(error);
  res.sendStatus(500);
});
});

router.get('/saveRate/image/:image_id/rate/:valueRate', (req, res) => {
  const {image_id, valueRate} = req.params;
  params = {};
  params.image_id = image_id;
  params.valueRate = valueRate;
  console.log(params);
  userUtils.saveRate(req.email, params);
  res.sendStatus(200);
  });
  

  router.get('/getImagesForGame/amount/:num', (req, res) => {
    console.log(req.params);
    const {num} = req.params;
    let amount = num;
    params = {};
    params.amount = amount;
    userUtils.getGameImages(req.email, params)
    .then((info_array) => {
      if (info_array.length == 0)
        res.status(205).send({ message: "No images found", success: true });
      else{
        console.log(info_array);
        res.status(200).send(info_array);
      } 
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });  
  });

  router.get('/numberOfImages', (req, res) => {
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
  //  router.get('/checkUserAnswers', (req,res) => {
  //   console.log("users.js");
  //   // const {num} = req.params;
  //   // let amount = num;
  //   // params = {};
  //   // params.amount = amount;
  //   userUtils.checkUserAnswers()
  //   .then((info_array) => {
  //     if (info_array.length == 0)
  //       res.status(205).send({ message: "No selected images found", success: true });
  //     else{
  //       console.log(info_array);
  //       res.status(200).send(info_array);
  //     } 
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     res.sendStatus(500);
  //   }); 
  //  });
  
module.exports = router;
