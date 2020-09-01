const express = require("express");
const router = express.Router();
const mysqlConnection = require("../db_connection");

router.get("/:name", (req, res) => {
  mysqlConnection.query(
    "select * from course where name = ?",
    [req.params.name],
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
