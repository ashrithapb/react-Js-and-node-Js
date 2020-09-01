const express = require("express");
const router = express.Router();
const mysqlConnection = require("../db_connection");

router.get("/:id", (req, res) => {
  mysqlConnection.query(
    "select * from test where id= ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});
module.exports = router;
