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
    // image = "data:image/jpeg;base64,"+dataImage[0].image.toString('base64');
    fileNameToSave = "../FrontEnd/src/assets/imageToRate.jpg";
    fs.writeFileSync(fileNameToSave, dataImage[0].image)
    return {imageID: rand, image: "imageToRate"}
}

async function saveRate(email,params){
    await DButils.execQuery(
        `INSERT INTO userRating VALUES ('${params.image_id}','${email}', '${params.valueRate}')`
      );
}

async function getGameImages(email, params){
  allRatesOfUser = await DButils.execQuery(`SElECT image_id, rate FROM userRating WHERE email='${email}'`);
  var i=0;
  images = [];
  //algorithm for select images and save images in table for game 
  while(i< params.amount){
    dataImage = await DButils.execQuery(`SElECT image FROM images WHERE imageID='${allRatesOfUser[i].image_id}'`)
    // image = "data:image/jpeg;base64,"+dataImage[0].image.toString('base64');
    fileNameToSave = "../FrontEnd/src/assets/image"+i+".jpg";
    fileNameForFront = "image"+i;
    fs.writeFileSync(fileNameToSave, dataImage[0].image)
    data = {image_id: allRatesOfUser[i].image_id , image: fileNameForFront}
    images.push(data);
    i+=1;
  }
  return images;
}

async function getNmberOfImages(email){
  allRatesOfUser = await DButils.execQuery(`SElECT image_id, rate FROM userRating WHERE email='${email}'`);
  return allRatesOfUser;
}

async function getNmberOfImagesToRate(){
  minimum_images_rating = await DButils.execQuery(`SElECT minimum_images_rating FROM parameters WHERE date IN (SELECT max(date) FROM parameters)`);
  console.log(minimum_images_rating);
  return minimum_images_rating;
}

//  async function checkUserAnswers(){

//  }

exports.getRandomImageToRate=getRandomImageToRate;
exports.saveRate = saveRate;
exports.getGameImages= getGameImages;
exports.getNmberOfImages=getNmberOfImages;
exports.getNmberOfImagesToRate=getNmberOfImagesToRate;