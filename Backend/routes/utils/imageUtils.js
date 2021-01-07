const DButils = require("./DButils");
const fs = require("fs");
const { Buffer } = require("buffer");


async function getImages(){
    const nums = new Set();
    while(nums.size !== 9) {
      nums.add(getRandomInt(1,31));
    }
    const images= [];
    for(let number of nums.values()){
        images.push(await DButils.execQuery(`SElECT image FROM imagesURL WHERE imageID='${number}'`));
    }
    
    return images
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }


exports.getImages = getImages;
