const DButils = require("./DButils");

async function getUsersInSystem(){
    users = await DButils.execQuery(`SElECT email, firstname, lastname, dateOfRegistration, status, lastLogin, gameTime FROM users`);
    for(user in users){
        rates = await DButils.execQuery(`SElECT image_id FROM userRating where email='${users[user].email}'`);
        console.log(rates);
        users[user].numOfRates= rates.length;
        //games***
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


exports.getUsersInSystem = getUsersInSystem;
exports.getParams=getParams;
exports.updateParams=updateParams;