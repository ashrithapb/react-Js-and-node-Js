const express = require("express");
const router = express.Router();
const mysqlConnection = require("../db_connection");

router.post("/", (req, res) => {
  let id = req.body.id;
  let name = req.body.name;
  let domain = req.body.domain;
  let description = req.body.description;
  mysqlConnection.query(
    "insert into course values(" +
      id +
      ",'" +
      name +
      "','" +
      domain +
      "','" +
      description +
      "')",
    (err, result) => {
      if (err) {
        res.send({ insert: "Failed to add" });
      } else {
        res.send({ insert: "Added successlly" });
      }
    }
  );
});
module.exports = router;
