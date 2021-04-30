const DButils = require("./DButils");
const fs = require("fs");

async function getImages(amount){
    const images= [];
    const nums = new Set();
    while(nums.size != amount) {
      nums.add(getRandomInt(1,270));
    }
    let i = 1;
    for(let number of nums.values()){
      dataImage = await DButils.execQuery(`SELECT image FROM image WHERE imageID='${number}'`);  
      // fileNameToSave = "../FrontEnd/src/assets/image"+i+".jpg";
      // fileNameForFront = "image"+i;
      // fs.writeFileSync(fileNameToSave, dataImage[0].image)
      // console.log(dataImage);
      images.push("data:image/jpeg;base64,"+dataImage[0].image.toString('base64'));
      // images.push(fileNameForFront);
      i+=1;
    }
   
    return images;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }


  

exports.getImages = getImages;
