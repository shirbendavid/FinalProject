const DButils = require("./DButils");
const fs = require("fs");

async function getRandomImageToRate(email){
    var imageExists = new Boolean(true);
    var rand = undefined;
    while(imageExists){
        rand = getRandomInt(1,144);
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
  rates = await DButils.execQuery(`SElECT * FROM ratePerUser WHERE email='${email}'`);
  let level1 = 0;
  let level2 = 0;
  let level3 = 0;
  for(number in rates[0]){
    if(number>0 && number<4)
      level1 = level1 + rates[0][number];
    else if(number>3 && number<8)
      level2 = level2 + rates[0][number];
    else if(number>7 && number<11)
      level3 = level3 + rates[0][number];
  }
  let amountSelect = params.selected*params.screens;
  let amount = params.num*params.screens - amountSelect;
  //Uniform distribution
  if(level1 >= 0.75*amount  && level2 >= 0.25*amount && level3 >= amountSelect){
    imagesLevel3 = await DButils.execQuery(`SElECT image_id, rate FROM userRating WHERE email='${email}' and rate>'7' and rate<'11'`);
    const ids3 = new Set();
    while(ids3.size <= amountSelect) {
      ids3.add(imagesLevel3[getRandomInt(0, imagesLevel3.length)]);
    }
    imagesLevel1 = await DButils.execQuery(`SElECT image_id, rate FROM userRating WHERE email='${email}' and rate>'0' and rate<'4'`);
    const ids1 = new Set();
    while(ids1.size < parseInt(amount*0.75)) {
      ids1.add(imagesLevel1[getRandomInt(0, imagesLevel1.length)]);    
    }
    imagesLevel2 = await DButils.execQuery(`SElECT image_id, rate FROM userRating WHERE email='${email}' and rate>'3' and rate<'8'`);
    const ids2 = new Set();
    while(ids2.size <= amount - ids1.size) {
      ids2.add(imagesLevel2[getRandomInt(0, imagesLevel2.length)]);    
    }
    ids1_arr = Array.from(ids1);
    ids2_arr = Array.from(ids2);
    ids3_arr = Array.from(ids3);
    images = [];
    images_id = [];
    target_id = [];
    i=0;
    index1=0;
    index2=0;
    index3=0;
    while(i < params.screens){
      j=0;
      k=0;
      t=0;
      images.push({screen: i+1 , imagesScreen: []});
      images_id.push('');
      target_id.push('');
      while(j < parseInt(0.75*(params.num-params.selected))){
        while(k < params.selected){
          dataImage = await DButils.execQuery(`SElECT image FROM image WHERE imageID='${ids3_arr[index3].image_id}'`)
          image = "data:image/jpeg;base64,"+dataImage[0].image.toString('base64');
          data = {image_id: ids3_arr[index3].image_id , image: image, target: true}
          images[i].imagesScreen.push(data);
          images_id[i] = images_id[i] + ids3_arr[index3].image_id + ',';
          target_id[i] = target_id[i] + ids3_arr[index3].image_id + ',';
          k++;
          index3++;
        }
        dataImage = await DButils.execQuery(`SElECT image FROM image WHERE imageID='${ids1_arr[index1].image_id}'`)
        image = "data:image/jpeg;base64,"+dataImage[0].image.toString('base64');
        data = {image_id: ids1_arr[index1].image_id , image: image, target: false}
        images[i].imagesScreen.push(data);
        images_id[i] = images_id[i] + ids1_arr[index1].image_id + ',';
        j++;
        index1++;
      }
      while(t < (params.num-params.selected)-j){
        dataImage = await DButils.execQuery(`SElECT image FROM image WHERE imageID='${ids2_arr[index2].image_id}'`)
        image = "data:image/jpeg;base64,"+dataImage[0].image.toString('base64');
        data = {image_id: ids2_arr[index2].image_id , image: image, target: false}
        images[i].imagesScreen.push(data);
        images_id[i] = images_id[i] + ids2_arr[index2].image_id + ',';
        t++;
        index2++;
      }
      i++;
    }
    //save in DB 
    await DButils.execQuery(
      `INSERT INTO games VALUES ('${email}',default,NULL)`
    );
    game_id = await DButils.execQuery(`SElECT game_id FROM games WHERE gameTime IN (SELECT max(gameTime) FROM games WHERE email='${email}')`);
    m=1;
    while(m <= params.screens){
      await DButils.execQuery(
        `INSERT INTO gameScreens VALUES ('${game_id[0].game_id}','${m}','${images_id[m-1]}', '${target_id[m-1]}',NULL)`
      );
      m++;
    }
    }
    images.push(game_id[0].game_id);
  return images;
}

async function saveScoreScreen(params){
  await DButils.execQuery(`UPDATE gameScreens SET score='${params.scoreScreen}' WHERE game_id='${params.gameID}' AND screenNum='${params.screenNum}'`);
}

async function saveScoreGame(email,params){
  console.log('hereee!')
  await DButils.execQuery(`UPDATE games SET scoreGame='${params.score}' WHERE game_id='${params.gameID}' AND email='${email}'`);
}

async function getNmberOfImages(email){
  allRatesOfUser = await DButils.execQuery(`SElECT image_id, rate FROM userRating WHERE email='${email}'`);
  return allRatesOfUser;
}

async function getAllParams(){
  params = await DButils.execQuery(`SElECT * FROM parameters WHERE date IN (SELECT max(date) FROM parameters)`);
  imagesInDB = await DButils.execQuery(`SElECT COUNT(imageID) AS rows FROM image`);
  params.push({number_of_images_in_DB: imagesInDB[0].rows});
  return params;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

exports.getRandomImageToRate=getRandomImageToRate;
exports.saveRate = saveRate;
exports.getGameImages= getGameImages;
exports.getNmberOfImages=getNmberOfImages;
exports.getAllParams = getAllParams;
exports.saveScoreScreen = saveScoreScreen;
exports.saveScoreGame = saveScoreGame;