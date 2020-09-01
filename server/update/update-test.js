const express = require("express");
const router = express.Router();
const mysqlConnection = require("../db_connection");
router.put("/", (req, res) => {
  let id = req.body.id;
  let course_id = req.body.course_id;
  let num_of_questions = req.body.num_of_questions;
  let name = req.body.name;
  let duration = req.body.duration;

  mysqlConnection.query(
    "update test set course_id =" +
      course_id +
      ",num_of_questions=" +
      num_of_questions +
      ",name='" +
      name +
      "',duration='" +
      duration +
      "' where id=" +
      id,
    (err, result) => {
      if (err) {
        res.send({ update: "Failed to add" });
      } else {
        res.send({ update: "Updated successlly" });
      }
    }
  );
});
module.exports = router;
