const DButils = require("./DButils");
const fs = require("fs");

async function getRandomImageToRate(email){
    var imageExists = new Boolean(true);
    var rand = undefined;
    while(imageExists){
        min = Math.ceil(19);
        max = Math.floor(140);
        rand = Math.floor(Math.random() * (max - min) + min);
        image = await DButils.execQuery(`SElECT image_id FROM userRating WHERE image_id='${rand}' AND email='${email}'`);
        console.log(image);
        if(image.length === 0)
            imageExists = false;
    }
    dataImage = await DButils.execQuery(`SElECT imageID, image FROM images WHERE imageID='${rand}'`)
    fileNameToSave = "../FrontEnd/src/assets/imageToRate.jpg";
    fs.writeFileSync(fileNameToSave, dataImage[0].image)
    return {imageID: rand, image: "imageToRate"}
}

async function saveRate(email,params){
    await DButils.execQuery(
        `INSERT INTO userRating VALUES ('${params.image_id}','${email}', '${params.valueRate}')`
      );
}

async function getGameImages(){
    const gameHighRateImages= [];
    const nums = new Set();
    const minRate= 6;
    while(nums.size !== 9) {
      nums.add(getRandomInt(1,31));
    }
    const gameLowRateImages= [];
    for(let number of nums.values()){
        gameHighRateImages.push(await DButils.execQuery(`SElECT imageRate FROM userRating WHERE rate>'${minRate}'`));
        gameLowRateImages.push(await DButils.execQuery(`SElECT imageRate FROM userRating WHERE rate<='${minRate}'`));

    }
    const imagesGame= new Set();
    for(let imageID of gameHighRateImages.values()){
      imagesGame.push({ image: await DButils.execQuery(`SElECT image FROM imagesURL WHERE imageID='${imageID}'`), id: imageID, rate: "high"});
    }
    for(let imageID of gameLowRateImages.values()){
      imagesGame.push({ image: await DButils.execQuery(`SElECT image FROM imagesURL WHERE imageID='${imageID}'`), id: imageID, rate: "low"});
    }

    imagesGame.push("C:/Users/User/Desktop/Image_Preference_Project/Animals/AABO99I.jpg");
    const buffer = fs.readFileSync(imagesGame[0].image, 'utf8');
    console.log(buffer);
    fs.writeFileSync("../FrontEnd/src/assets/image1.jpg", buffer);
    return imagesGame;
}

exports.getRandomImageToRate=getRandomImageToRate;
exports.saveRate = saveRate;
exports.getGameImages= getGameImages;