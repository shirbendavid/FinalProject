
const express = require("express");
const router = express.Router();
// const axios = require("axios");
const search_util = require("./utils/search_recipes");


const bodyParser = require('body-parser')
var knex = require('knex')({
    client: 'mssql',
    connection: {
    user: "coil_user",
    password: 'coil_user',
    server: 'localhost',
    database: 'DB_Project',
    port: 1433
    },
    useNullAsDefault: true
  });

// const knex = require('mssql')({
//     client: 'sqlite3',
//     connection: {
//         filename: "./img.db"
//     },
//     useNullAsDefault: true
// });

app.get('/', async (req, res) => {
    res.send('Hello vro!')
})

app.post('/upload', async (req, res) => {
    const {name, data} = req.files.pic;
    if (name && data) {
        await knex.insert({name: name, img: data}).into('img');
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
})

app.get('/img/:id', async (req, res) => {
    const id = req.params.id;
    const img = await knex('img').where({id: id}).first();
    if (img) {
        const contentType = await FileType.fromBuffer(img.img); // get the mimetype of the buffer (in this case its gonna be jpg but can be png or w/e)
        res.type(contentType.mime); // not always needed most modern browsers including chrome will understand it is an img without this
        res.end(img.img);
    } else {
        res.end('No Img with that Id!');
    }
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


// this function returns 3 random recipes who have instructions!
// router.get("/randomImages", async(req, res, next) => {
//     try {
//         random_params = {};
//         random_params.number = 9;
//         search_util.getRandomRecipes(random_params)
//             .then((info_array) => res.send(info_array))
//             .catch((error) => {
//                 res.sendStatus(error.response.status);
//             });
//     } catch (error) {
//         next(error);
//     }
// });

// router.get("/getImage", async(req, res, next) => {
//     try {
//         const image = (
//             await DButils.execQuery(
//               `SELECT * FROM images`
//             )
//           )[0];
        
//           console.log(image);

//           res.send(image);

//     } catch (error) {
//         next(error);
//     }
// });



// // this function returns preview of recipe by his id
// router.get("/preview/imageId/:imageId", async(req, res) => {
//     const { imageId } = req.params;
//     search_params = {};
//     search_params.imageId = imageId;

//     search_util.getPreivewForRecipe(search_params)
//         .then((info_array) => res.send(info_array))
//         .catch((error) => {
//             res.sendStatus(error.response.status);
//         });
// });

