
const express = require("express");
const router = express.Router();
// const axios = require("axios");
const search_util = require("./utils/search_recipes");

// this function returns 3 random recipes who have instructions!
router.get("/randomImages", async(req, res, next) => {
    try {
        random_params = {};
        random_params.number = 9;
        search_util.getRandomRecipes(random_params)
            .then((info_array) => res.send(info_array))
            .catch((error) => {
                res.sendStatus(error.response.status);
            });
    } catch (error) {
        next(error);
    }
});

router.get("/getImage", async(req, res, next) => {
    try {
        const image = (
            await DButils.execQuery(
              `SELECT * FROM images`
            )
          )[0];
        
          console.log(image);

          res.send(image);

    } catch (error) {
        next(error);
    }
});



// this function returns preview of recipe by his id
router.get("/preview/imageId/:imageId", async(req, res) => {
    const { imageId } = req.params;
    search_params = {};
    search_params.imageId = imageId;

    search_util.getPreivewForRecipe(search_params)
        .then((info_array) => res.send(info_array))
        .catch((error) => {
            res.sendStatus(error.response.status);
        });
});