const express = require("express");
const router = express.Router();
const imageUtils = require("./utils/imageUtils");

router.get('/getImages/amount/:num', (req, res) => {
  const {num} = req.params;
  let amount = num;
  imageUtils.getImages(amount)
  .then((info_array) => {
    if (info_array.length == 0)
      res.status(205).send({ message: "No images found", success: true });
    else{
      // console.log(info_array);
      res.send(info_array);
    } 
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });  
});


module.exports = router;
