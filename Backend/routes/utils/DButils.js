const sql = require("mssql");

const config = {
  server: "localhost\ISE-NODEJS-W10",
  database: "DB_Project",
}

// const pool = new sql.ConnectionPool(config);
// const poolConnect = pool
//   .connect()
//   .then(() => console.log("new connection pool Created"))
//   .catch((err) => console.log(err));

// exports.execQuery = async function (query) {
//   await poolConnect;
//   try {
//     var result = await pool.request().query(query);
//     return result.recordset;
//   } catch (err) {
//     console.error("SQL error", err);
//     throw err;
//   }
// };