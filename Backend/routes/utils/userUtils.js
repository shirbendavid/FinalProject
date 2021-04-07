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
  while(i< params.amount){
    // min = Math.ceil(0);
    // max = Math.floor(allRatesOfUser.length);
    // rand = Math.floor(Math.random() * (max - min) + min);
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

// async function getGameImages(email, params){
  //   const gameHighRateImages= [];
  //   const gameLowRateImages= [];

  //   const minRate= 7;
  //   console.log(params.amount);
  //   const allMax = await DButils.execQuery(`SElECT image_id FROM userRating WHERE rate>'${minRate}'`); 
  //   const allMin = await DButils.execQuery(`SElECT image_id FROM userRating WHERE rate<='${minRate}'`); 
  //   console.log(allMax);

  //   let i = 0;
  //  // while(i < params.amount/2){
  //     while(i < 2){
  //      // gameHighRateImages.push(await DButils.execQuery(`SElECT image_id FROM userRating WHERE rate>'${minRate}'`));
  //      gameHighRateImages.push(allMax[i].image_id);
  //      gameLowRateImages.push(allMin[i].image_id);
  //      console.log(gameHighRateImages);
  //     // console.log(gameLowRateImages);

  //       i+=1;
  //   }
  //   console.log();

  //   const imagesGame = [];
  //   //i=0;
  //   for(let imageID of gameHighRateImages.values()){
  //     console.log(imageID);
  //     dataImage = await DButils.execQuery(`SELECT image FROM images WHERE imageID='${imageID}'`);  
  //     console.log("before" + imageID);
  //     console.log(dataImage[0].image);
  //     imagesGame.push({ image: "data:image/jpeg;base64,"+dataImage[0].image.toString('base64'), id: imageID, rate: "high"});

  //     //imagesGame.push("data:image/jpeg;base64,"+dataImage[0].image.toString('base64'));
  //     console.log("after");
  //     //i+=1;
  //   }
  //  // i=0;

  //   for(let imageID of gameLowRateImages.values()){
  //     dataImage = await DButils.execQuery(`SELECT image FROM images WHERE imageID='${imageID}'`);  
  //     imagesGame.push({ image: "data:image/jpeg;base64,"+dataImage[0].image.toString('base64'), id: imageID, rate: "low"});
  //    // i+=1;
  //     // imagesGame.push({ image: await DButils.execQuery(`SElECT image FROM imagesURL WHERE imageID='${imageID}'`), id: imageID, rate: "low"});
  //    // imagesGame.push("data:image/jpeg;base64,"+dataImage[0].image.toString('base64'));
  //   }

  //   //imagesGame.push("C:/Users/User/Desktop/Image_Preference_Project/Animals/AABO99I.jpg");
  //   //const buffer = ;
  //  //imagesGame.forEach(x => x.imageData = fs.readFileSync(x.image, 'utf8'))
  //   // console.log(buffer);

  //   //fs.writeFileSync("../FrontEnd/src/assets/image1.jpg", buffer);
  //   return imagesGame;
// }
//  async function checkUserAnswers(){

//  }

exports.getRandomImageToRate=getRandomImageToRate;
exports.saveRate = saveRate;
exports.getGameImages= getGameImages;
exports.getNmberOfImages=getNmberOfImages;