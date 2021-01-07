 const sql = require("mssql");

// const config = {
//   user: "coil_user",
//   password: 'coil_user',
//   server: 'localhost',
//   database: 'DB_Project',
//   port: 1433
// };
// sql.connect(config, function (err){
//   if(err){
//     console.log(err)
//   }
// })

exports.execQuery = async function (query) {
  try {
    var result = await sql.query(query);
    return result.recordset;
  } catch (err) {
    console.error("SQL error", err);
    throw err;
  }
};
