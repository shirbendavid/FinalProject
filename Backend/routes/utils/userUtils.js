const DButils = require("./DButils");

function getRandomImageToRate(user_id){
    image=await DButils.execQuery();// random image from DB 
    
}

exports.getRandomImageToRate=getRandomImageToRate;