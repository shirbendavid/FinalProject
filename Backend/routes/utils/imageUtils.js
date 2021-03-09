const DButils = require("./DButils");
const fs = require("fs");

async function getImages(amount){
    const images= [];
    const nums = new Set();
    while(nums.size != amount) {
      nums.add(getRandomInt(19,140));
    }
    let i = 1;
    for(let number of nums.values()){
      dataImage = await DButils.execQuery(`SELECT image FROM images WHERE imageID='${number}'`);  
      fileNameToSave = "../FrontEnd/src/assets/image"+i+".jpg";
      fileNameForFront = "image"+i;
      fs.writeFileSync(fileNameToSave, dataImage[0].image)
      images.push(fileNameForFront);
      i+=1;
    }
   
    return images;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

async function getGameImages(){
    const gameHighRateImages= [];
    /*const nums = new Set();
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
    }*/

    imagesGame.push("C:/Users/User/Desktop/Image_Preference_Project/Animals/AABO99I.jpg");
    const buffer = fs.readFileSync(imagesGame[0].image, 'utf8');
    console.log(buffer);
    fs.writeFileSync("../FrontEnd/src/assets/image1.jpg", buffer);
    return imagesGame;
}
  

exports.getImages = getImages;
exports.getGameImages= getGameImages;