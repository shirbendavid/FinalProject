const DButils = require("./DButils");
const fs = require("fs");

async function getRandomImageToRate(user_id){
    var imageExists = new Boolean(true);
    var rand = undefined;
    while(imageExists){
        min = Math.ceil(19);
        max = Math.floor(140);
        rand = Math.floor(Math.random() * (max - min) + min);
        image = await DButils.execQuery(`SElECT image_id FROM userRating WHERE image_id='${rand}' AND user_id='${user_id}'`);
        console.log(image);
        if(image.length === 0)
            imageExists = false;
    }
    dataImage = await DButils.execQuery(`SElECT imageID, image FROM images WHERE imageID='${rand}'`)
    fileNameToSave = "../FrontEnd/src/assets/imageToRate.jpg";
    fs.writeFileSync(fileNameToSave, dataImage[0].image)
    return {imageID: rand, image: "imageToRate"}
}

async function saveRate(user_id,params){
    await DButils.execQuery(
        `INSERT INTO userRating VALUES ('${params.image_id}','${user_id}', '${params.valueRate}')`
      );
}

exports.getRandomImageToRate=getRandomImageToRate;
exports.saveRate = saveRate;