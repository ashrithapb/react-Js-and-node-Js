const express = require("express");
const router = express.Router();
const mysqlConnection = require("../db_connection");

router.put("/", (req, res) => {
  let id = req.body.id;
  let name = req.body.name;
  let domain = req.body.domain;
  let description = req.body.description;
  mysqlConnection.query(
    "update course set name ='" +
      name +
      "',domain='" +
      domain +
      "',description='" +
      description +
      "' where id=" +
      id,
    (err, result) => {
      if (err) {
        res.send({ update: "failed to update" });
      } else {
        res.send({ update: "Updated successfully" });
      }
    }
  );
});
module.exports = router;
