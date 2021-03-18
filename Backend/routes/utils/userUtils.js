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

async function getGameImages(params){
  console.log("amounttt");
    const gameHighRateImages= [];
    const nums = new Set();
    const minRate= 6;
    console.log(params.amount);
    // while(nums.size < params.amount) {
    //   //console.log(nums.size);
    //   nums.add(getRandomInt(1,31));
    // }
    //console.log("after random");

    const gameLowRateImages= [];
    const allMax = await DButils.execQuery(`SElECT image_id FROM userRating WHERE rate>'${minRate}'`); 
    const allMin = await DButils.execQuery(`SElECT image_id FROM userRating WHERE rate<='${minRate}'`); 
    console.log(allMax);

    let i = 0;
    //while(i < params.amount / 2){
      while(i < 2){

       // gameHighRateImages.push(await DButils.execQuery(`SElECT image_id FROM userRating WHERE rate>'${minRate}'`));
       gameHighRateImages.push(allMax[i].image_id);
       //gameHighRateImages.push(allMin[i].image_id);
       console.log(gameHighRateImages);
        i+=1;
    }
    console.log();

    const imagesGame = [];

    for(let imageID of gameHighRateImages.values()){
      console.log(imageID);
       dataImage = await DButils.execQuery(`SELECT image FROM images WHERE imageID='${imageID}'`);  
      // imagesGame.push({ image: "data:image/jpeg;base64,"+dataImage[imageID].image.toString('base64'), id: imageID, rate: "high"});
      console.log("before" + imageID);
      console.log(dataImage[0].image);

      imagesGame.push("data:image/jpeg;base64,"+dataImage[0].image.toString('base64'));
      console.log("after");

    }
    for(let imageID of gameLowRateImages.values()){
      dataImage = await DButils.execQuery(`SELECT image FROM images WHERE imageID='${imageID}'`);  
      //imagesGame.push({ image: "data:image/jpeg;base64,"+dataImage[imageID].image.toString('base64'), id: imageID, rate: "low"});
      
      // imagesGame.push({ image: await DButils.execQuery(`SElECT image FROM imagesURL WHERE imageID='${imageID}'`), id: imageID, rate: "low"});
      imagesGame.push("data:image/jpeg;base64,"+dataImage[0].image.toString('base64'));
    }

    //imagesGame.push("C:/Users/User/Desktop/Image_Preference_Project/Animals/AABO99I.jpg");
    //const buffer = ;
   //imagesGame.forEach(x => x.imageData = fs.readFileSync(x.image, 'utf8'))
    // console.log(buffer);

    //fs.writeFileSync("../FrontEnd/src/assets/image1.jpg", buffer);
    return imagesGame;
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

exports.getRandomImageToRate=getRandomImageToRate;
exports.saveRate = saveRate;
exports.getGameImages= getGameImages;