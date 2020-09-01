const prop = require("./db_properties");
const mysql = require("mysql");
var mysqlConnection = mysql.createConnection(prop);
mysqlConnection.connect((err) => {
  if (!err) {
    console.log("connected");
  } else {
    console.log("connection failed");
  }
});
module.exports = mysqlConnection;
