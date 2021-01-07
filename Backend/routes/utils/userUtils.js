const DButils = require("./DButils");

async function getRandomImageToRate(user_id){
    var imageExists = new Boolean(true);
    var rand = undefined;
    while(imageExists){
        min = Math.ceil(1);
        max = Math.floor(31);
        rand = Math.floor(Math.random() * (max - min) + min);
        image = await DButils.execQuery(`SElECT image_id FROM userRating WHERE image_id='${rand}'`);
        console.log(image);
        if(image.length === 0)
            imageExists = false;
    }
    return await DButils.execQuery(`SElECT image FROM imagesURL WHERE imageID='${rand}'`)
}

exports.getRandomImageToRate=getRandomImageToRate;