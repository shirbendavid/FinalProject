const DButils = require("./DButils");
const fs = require("fs");
const fetch = require('node-fetch');
const { Buffer } = require("buffer");


async function getImages(){
    const images= [];
    /*const nums = new Set();
    while(nums.size !== 9) {
      nums.add(getRandomInt(1,31));
    }
    const images= [];
    for(let number of nums.values()){
        images.push(await DButils.execQuery(`SElECT image FROM imagesURL WHERE imageID='${number}'`));
    }*/
    images.push("C:/Users/User/Desktop/Image_Preference_Project/Animals/AABO99I.jpg");
    const buffer = fs.readFileSync(images[0], 'utf8');
    console.log(buffer);
    fs.writeFileSync("../FrontEnd/src/assets/image1.jpg", buffer);
    return images;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

exports.getImages = getImages;