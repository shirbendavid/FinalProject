const DButils = require("./DButils");
const fs = require("fs");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

async function getAllParams(){
  params = await DButils.execQuery(`SElECT * FROM parameters WHERE date IN (SELECT max(date) FROM parameters)`);
  imagesInDB = await DButils.execQuery(`SElECT COUNT(imageID) AS rows FROM image`);
  params.push({number_of_images_in_DB: imagesInDB[0].rows});
  return params;
}

//Rate image
async function getRandomImageToRate(email){
    var imageExists = new Boolean(true);
    var rand = undefined;
    while(imageExists){
        rand = getRandomInt(1,318);
        image = await DButils.execQuery(`SElECT image_id FROM userRating WHERE image_id='${rand}' AND email='${email}'`);
        if(image.length === 0)
            imageExists = false;
    }
    dataImage = await DButils.execQuery(`SElECT imageID, image FROM image WHERE imageID='${rand}'`)
    image = "data:image/jpeg;base64,"+dataImage[0].image.toString('base64');
    // fileNameToSave = "../FrontEnd/src/assets/imageToRate.jpg";
    // fs.writeFileSync(fileNameToSave, dataImage[0].image)
    console.log(rand);
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

//Game
async function getGameImages(email, params){
  rates = await DButils.execQuery(`SElECT image_id, rate FROM userRating WHERE email='${email}' ORDER BY rate DESC`);
  indexLavel1 = rates.length*0.2;
  indexLevel2 = rates.length*0.2 + indexLavel1;

  level1 =[];
  level2 =[];
  level3 =[];
  index2 = 0;
  index3 = 0;
  for(let index in rates){
    if(index < indexLavel1)
      level1[index] = rates[index];
    else if(index < indexLevel2){
      level2[index2] = rates[index];
      index2++
    }
    else{
      level3[index3] = rates[index];
      index3++
    }
  }
  let amountSelect = params.selected*params.screens;
  let amount = params.num*params.screens - amountSelect;
  const ids1 = new Set();
  while(ids1.size <= amountSelect) {
    ids1.add(level1[getRandomInt(0, level1.length)]);
  }
  const ids3 = new Set();
  while(ids3.size <= amount) {
    ids3.add(level3[getRandomInt(0, level3.length)]);
  }
  images = [];
  images_id = [];
  target_id = [];
  i=0;
  index1=0;
  index3=0;
  while(i < params.screens){
    j=0;
    k=0;
    images.push({screen: i+1 , imagesScreen: []});
    images_id.push('');
    target_id.push('');
    while(j < params.num-params.selected){
      while(k < params.selected){
        dataImage = await DButils.execQuery(`SElECT image FROM image WHERE imageID='${level1[index1].image_id}'`)
        image = "data:image/jpeg;base64,"+dataImage[0].image.toString('base64');
        data = {image_id: level1[index1].image_id , image: image, target: true}
        images[i].imagesScreen.push(data);
        images_id[i] = images_id[i] + level1[index1].image_id + ',';
        target_id[i] = target_id[i] + level1[index1].image_id + ',';
        k++;
        index1++;
      }
      dataImage = await DButils.execQuery(`SElECT image FROM image WHERE imageID='${level3[index3].image_id}'`)
      image = "data:image/jpeg;base64,"+dataImage[0].image.toString('base64');
      data = {image_id: level3[index3].image_id , image: image, target: false}
      images[i].imagesScreen.push(data);
      images_id[i] = images_id[i] + level3[index3].image_id + ',';
      j++;
      index3++;
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
      `INSERT INTO gameScreens VALUES ('${game_id[0].game_id}','${m}','${images_id[m-1]}', '${target_id[m-1]}',NULL,NULL)`
    );
    m++;
  }
  images.push(game_id[0].game_id);
  
  for(i=0;i<params.screens;i++){
    images[i].imagesScreen.sort(function (x, y) {
      let a = x.image_id,
          b = y.image_id;
      return a == b ? 0 : a > b ? 1 : -1;
  });
  }
  return images;
}

async function saveScoreScreen(params){
  await DButils.execQuery(`UPDATE gameScreens SET userSelection='${params.images}', score='${params.scoreScreen}' WHERE game_id='${params.gameID}' AND screenNum='${params.screenNum}'`);
}

async function saveScoreGame(email,params){
  await DButils.execQuery(`UPDATE games SET scoreGame='${params.score}' WHERE game_id='${params.gameID}' AND email='${email}'`);
}

async function getNmberOfImages(email){
  allRatesOfUser = await DButils.execQuery(`SElECT image_id, rate FROM userRating WHERE email='${email}'`);
  return allRatesOfUser;
}

async function checkIfPlay(email){
  play = await DButils.execQuery(`SElECT * FROM games WHERE email='${email}' AND CAST(gameTime AS DATE) = CAST(GETDATE() AS DATE)`);
  return play;
}

async function getScreensGame(params){
  screens = await DButils.execQuery(`SElECT * FROM gameScreens WHERE game_id='${params.id}' AND score IS NULL`);
  return returnScreensWithImages(screens);
}

//helper function- return screen game with image data
async function returnScreensWithImages(screens){
  images = [];
  i = 0;
  for(screen in screens){
    images.push({screen: screens[screen].screenNum , imagesScreen: []});
    imagesIdInScreen = screens[screen].images_id.split(",");
    targetId_images = screens[screen].target.split(",");
    for(index in imagesIdInScreen){
      if(imagesIdInScreen[index]!=''){
        dataImage = await DButils.execQuery(`SElECT image FROM image WHERE imageID='${imagesIdInScreen[index]}'`)
        image = "data:image/jpeg;base64,"+dataImage[0].image.toString('base64');
        data = {image_id: imagesIdInScreen[index] , image: image, target: targetId_images.includes(imagesIdInScreen[index])}
        images[i].imagesScreen.push(data);
      }
    }
    i++;
  }
  return images;
}

async function getScoreScreens(params){
  score = await DButils.execQuery(`SElECT SUM(score) AS score FROM gameScreens WHERE game_id='${params.id}' AND score IS NOT NULL`);
  console.log(score);
  return score;
}

//Advanced Game
async function getImagesForAdvancedGame(email){
  let screens=0;
  let randGame=0;
  games = await DButils.execQuery(`SElECT game_id FROM games where game_id NOT IN (SELECT game_id FROM games WHERE email='${email}') AND scoreGame IS NOT NULL`);
  if(games.length == 0)
    return [];
  success= false;
  userGameId = '';
  while(!success){
    if(games.length == 1)
      randGame = 0;
    else
      randGame = getRandomInt(0,games.length);/// games.length-1
    userGameId = games[randGame].game_id;
    advancedGames = await DButils.execQuery(`SElECT * FROM advancedGames WHERE email='${email}' AND scoreGame IS NOT NULL`);
    existsGame = await DButils.execQuery(`SElECT * FROM advancedGames WHERE userGame_id='${userGameId}' AND email='${email}' AND scoreGame IS NOT NULL`);
    if(advancedGames.length == games.length)
      return [];
    if(existsGame.length==0)
      success = true;
  }

  screens = await DButils.execQuery(`SElECT * FROM gameScreens WHERE game_id='${userGameId}'`);
  images = await returnScreensWithImages(screens);
  //save in DB 
  await DButils.execQuery(
    `INSERT INTO advancedGames VALUES ('${email}','${userGameId}',default,NULL)`
  );
  advancedGame_id = await DButils.execQuery(`SElECT game_id FROM advancedGames WHERE gameTime IN (SELECT max(gameTime) FROM advancedGames WHERE email='${email}')`);
  m=0;
  while(m < screens.length){
    await DButils.execQuery(
      `INSERT INTO advancedGameScreens VALUES ('${advancedGame_id[0].game_id}','${m+1}','${screens[m].images_id}', '${screens[m].target}',NULL,NULL)`
    );
    m++;
  }
  // console.log(screens);
   images.push(advancedGame_id[0].game_id);
  for(i=0;i< screens.length;i++){
    images[i].imagesScreen.sort(function (x, y) {
      let a = x.image_id,
          b = y.image_id;
      return a == b ? 0 : a > b ? 1 : -1;
  });
  }
  return images;
}

async function saveScoreScreenAdvanced(params){
  await DButils.execQuery(`UPDATE advancedGameScreens SET userSelection='${params.images}', score='${params.scoreScreen}' WHERE game_id='${params.gameID}' AND screenNum='${params.screenNum}'`);
}

async function saveScoreAdvancedGame(email,params){
  await DButils.execQuery(`UPDATE advancedGames SET scoreGame='${params.score}' WHERE game_id='${params.gameID}' AND email='${email}'`);
}

//LeaderBorad
async function getTop10(){
  usersTop = await DButils.execQuery(`SElECT TOP 10 email, SUM(scoreGame) as score FROM games WHERE scoreGame IS NOT NULL GROUP BY email ORDER BY score DESC`);
  let i=1;
  for(user in usersTop){
    details = await DButils.execQuery(`SElECT firstname, lastname FROM users where email='${usersTop[user].email}'`);
    usersTop[user].place=i;
    i++;
    usersTop[user].name= details[0].firstname + " " + details[0].lastname;
  }
  return usersTop;
}

async function getTop10Advance(){
  usersTop = await DButils.execQuery(`SElECT TOP 10 email, SUM(scoreGame) as score FROM advancedGames WHERE scoreGame IS NOT NULL GROUP BY email ORDER BY score DESC`);
  let i=1;
  for(user in usersTop){
    details = await DButils.execQuery(`SElECT firstname, lastname FROM users where email='${usersTop[user].email}'`);
    usersTop[user].place=i;
    i++;
    usersTop[user].name= details[0].firstname + " " + details[0].lastname;
  }
  return usersTop;
}

exports.getRandomImageToRate=getRandomImageToRate;
exports.saveRate = saveRate;
exports.getGameImages= getGameImages;
exports.getNmberOfImages=getNmberOfImages;
exports.getAllParams = getAllParams;
exports.saveScoreScreen = saveScoreScreen;
exports.saveScoreGame = saveScoreGame;
exports.checkIfPlay = checkIfPlay;
exports.getScreensGame = getScreensGame;
exports.getImagesForAdvancedGame = getImagesForAdvancedGame;
exports.saveScoreScreenAdvanced = saveScoreScreenAdvanced;
exports.saveScoreAdvancedGame = saveScoreAdvancedGame;
exports.getScoreScreens = getScoreScreens;
exports.getTop10 = getTop10;
exports.getTop10Advance= getTop10Advance;