const DButils = require("./DButils");

async function getRandomImageToRate(user_id){
    var imageExists = new Boolean(true);
    var rand = undefined;
    while(imageExists){
        min = Math.ceil(1);
        max = Math.floor(31);
        rand = Math.floor(Math.random() * (max - min) + min);
        image = await DButils.execQuery(`SElECT image_id FROM userRating WHERE image_id='${rand}' AND user_id='${user_id}'`);
        console.log(image);
        if(image.length === 0)
            imageExists = false;
    }
    return await DButils.execQuery(`SElECT imageID, image FROM imagesURL WHERE imageID='${rand}'`)
}

async function saveRate(user_id,params){
    await DButils.execQuery(
        `INSERT INTO userRating VALUES ('${params.image_id}','${user_id}', '${params.valueRate}')`
      );
}

exports.getRandomImageToRate=getRandomImageToRate;
exports.saveRate = saveRate;