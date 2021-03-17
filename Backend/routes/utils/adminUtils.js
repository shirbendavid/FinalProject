const DButils = require("./DButils");

async function getUsersInSystem(){
    users = await DButils.execQuery(`SElECT email, firstname, lastname, status FROM users`);
    for(user in users){
        rates = await DButils.execQuery(`SElECT image_id FROM userRating where email='${users[user].email}'`);
        console.log(rates);
        users[user].numOfRates= rates.length;
        //games***
    }

    return users;
}

exports.getUsersInSystem = getUsersInSystem;