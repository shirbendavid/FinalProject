const express = require("express");
const router = express.Router();
const DButils = require("./utils/DButils");
const imageUtils = require("./utils/imageUtils");



router.get('/getImagesToObser', (req, res) => {
  imageUtils.getImages()
  .then((info_array) => {
    if (info_array.length == 0)
      res.status(205).send({ message: "No images found", success: true });
    else{
      console.log(info_array);
      res.send(info_array);
    } 
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });  

});



module.exports = router;
