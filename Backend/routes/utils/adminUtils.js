const DButils = require("./DButils");

async function getUsersInSystem(){
    users = await DButils.execQuery(`SElECT email, firstname, lastname, dateOfRegistration, status, lastLogin, gameTime FROM users`);
    for(user in users){
        rates = await DButils.execQuery(`SElECT image_id FROM userRating where email='${users[user].email}'`);
        users[user].numOfRates= rates.length;
        games = await DButils.execQuery(`SElECT game_id FROM games where email='${users[user].email}'`);
        users[user].numOfGames= games.length;
    }
    return users;
}

async function getParams(){
    param = await DButils.execQuery(`SElECT * FROM parameters WHERE date IN (SELECT max(date) FROM parameters)`);
    console.log(param);
    return param;
}

async function updateParams(allParams){
    promises=[];
    allParams.map((param)=>
    promises.push(param));
    let info= await Promise.all(promises);
    console.log(info);
    return await DButils.execQuery(`INSERT INTO parameters VALUES(default,'${info[0]}','${info[1]}','${info[2]}','${info[3]}','${info[4]}' )`);
}

async function getImagesId(){
    images = await DButils.execQuery(`SElECT imageID FROM image`);
    return images;
}

async function getImagesRatedByUsers(){
    users = await DButils.execQuery(`SElECT distinct email FROM userRating`);
    for(user in users){
        imagesRatedByUser = await DButils.execQuery(`SElECT image_id, rate FROM userRating where email='${users[user].email}'`);
        for(image in imagesRatedByUser){
            users[user][imagesRatedByUser[image].image_id]= imagesRatedByUser[image].rate; 
        }
    }
    return users;
}

async function getImagesRated(){
    images = await DButils.execQuery(`SElECT imageID FROM image`);
    for(image in images){
        imagesRatedByUser = await DButils.execQuery(`SElECT rate FROM userRating where image_id='${images[image].imageID}'`);
        for(rate in imagesRatedByUser){
            if(images[image][imagesRatedByUser[rate].rate] > 0)
                images[image][imagesRatedByUser[rate].rate]++ ;
            else
                images[image][imagesRatedByUser[rate].rate] = 1;
        }
    }
    return images;
}

async function changeStatus(userEmail){
    statusUser = await DButils.execQuery(`SELECT status FROM users WHERE email='${userEmail}'`);
    console.log(statusUser);
    if(statusUser[0].status == "active"){
        await DButils.execQuery(`UPDATE users SET status= 'deactive' WHERE email='${userEmail}'`);
    }
    else{
        await DButils.execQuery(`UPDATE users SET status= 'active' WHERE email='${userEmail}'`);
    }
    return getUsersInSystem();
}

async function deactiveAllUsers(){
    await DButils.execQuery(`UPDATE users SET status= 'deactive'`);
    return getUsersInSystem();
}

async function activeAllUsers(){
    await DButils.execQuery(`UPDATE users SET status= 'active'`);
    return getUsersInSystem();
}

exports.getUsersInSystem = getUsersInSystem;
exports.getParams = getParams;
exports.updateParams = updateParams;
exports.getImagesId = getImagesId;
exports.getImagesRatedByUsers = getImagesRatedByUsers;
exports.getImagesRated = getImagesRated; 
exports.changeStatus = changeStatus;
exports.deactiveAllUsers = deactiveAllUsers;
exports.activeAllUsers = activeAllUsers;