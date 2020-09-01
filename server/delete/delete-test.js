const express = require("express");
const router = express.Router();
const mysqlConnection = require("../db_connection");

router.delete("/:id", (req, res) => {
  mysqlConnection.query(
    "delete from test where id= ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        res.send({ delete: "fail" });
      } else {
        res.send({ delete: "success" });
      }
    }
  );
});
module.exports = router;
