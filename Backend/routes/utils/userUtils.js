const DButils = require("./DButils");
const fs = require("fs");

async function getRandomImageToRate(email){
    var imageExists = new Boolean(true);
    var rand = undefined;
    while(imageExists){
        min = Math.ceil(1);
        max = Math.floor(144);
        rand = Math.floor(Math.random() * (max - min) + min);
        image = await DButils.execQuery(`SElECT image_id FROM userRating WHERE image_id='${rand}' AND email='${email}'`);
        if(image.length === 0)
            imageExists = false;
    }
    dataImage = await DButils.execQuery(`SElECT imageID, image FROM image WHERE imageID='${rand}'`)
    image = "data:image/jpeg;base64,"+dataImage[0].image.toString('base64');
    // fileNameToSave = "../FrontEnd/src/assets/imageToRate.jpg";
    // fs.writeFileSync(fileNameToSave, dataImage[0].image)
    return {imageID: rand, image: image}
}

async function saveRate(email,params){
    await DButils.execQuery(
        `INSERT INTO userRating VALUES ('${params.image_id}','${email}', '${params.valueRate}')`
      );
      user = await DButils.execQuery(`SELECT email FROM ratePerUser WHERE email='${email}'`);
      console.log(user);
      if(user.length == 0){
        await DButils.execQuery(
          `INSERT INTO ratePerUser VALUES ('${email}',default,default,default,default,default,default,default,default,default,default)`
        );
      }
      rate = await DButils.execQuery(`SElECT * FROM ratePerUser WHERE email='${email}'`);
      rate[0][params.valueRate] = rate[0][params.valueRate]+1;
      await DButils.execQuery(`DELETE FROM ratePerUser WHERE email='${email}'`);
      await DButils.execQuery(
        `INSERT INTO ratePerUser VALUES ('${email}','${rate[0][1]}','${rate[0][2]}','${rate[0][3]}','${rate[0][4]}','${rate[0][5]}','${rate[0][6]}','${rate[0][7]}','${rate[0][8]}','${rate[0][9]}','${rate[0][10]}')`
      );
}

async function getGameImages(email, params){
  allRatesOfUser = await DButils.execQuery(`SElECT image_id, rate FROM userRating WHERE email='${email}'`);
  
  var i=0;
  images = [];
  //algorithm for select images and save images in table for game 
  while(i< params.amount){
    dataImage = await DButils.execQuery(`SElECT image FROM image WHERE imageID='${allRatesOfUser[i].image_id}'`)
    image = "data:image/jpeg;base64,"+dataImage[0].image.toString('base64');
    // fileNameToSave = "../FrontEnd/src/assets/image"+i+".jpg";
    // fileNameForFront = "image"+i;
    // fs.writeFileSync(fileNameToSave, dataImage[0].image)
    data = {image_id: allRatesOfUser[i].image_id , image: image}
    images.push(data);
    i+=1;
  }
  return images;
}

async function getNmberOfImages(email){
  allRatesOfUser = await DButils.execQuery(`SElECT image_id, rate FROM userRating WHERE email='${email}'`);
  return allRatesOfUser;
}

async function getAllParams(){
  params = await DButils.execQuery(`SElECT * FROM parameters WHERE date IN (SELECT max(date) FROM parameters)`);
  imagesInDB = await DButils.execQuery(`SElECT COUNT(imageID) AS rows FROM image`);
  params.push({number_of_images_in_DB: imagesInDB[0].rows});
  console.log(params);
  return params;
}

exports.getRandomImageToRate=getRandomImageToRate;
exports.saveRate = saveRate;
exports.getGameImages= getGameImages;
exports.getNmberOfImages=getNmberOfImages;
exports.getAllParams = getAllParams;