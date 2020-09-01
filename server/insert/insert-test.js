const express = require("express");
const router = express.Router();
const mysqlConnection = require("../db_connection");
router.post("/", (req, res) => {
  let id = req.body.id;
  let course_id = req.body.course_id;
  let num_of_questions = req.body.num_of_questions;
  let name = req.body.name;
  let duration = req.body.duration;

  mysqlConnection.query(
    "insert into test values(" +
      id +
      "," +
      course_id +
      "," +
      num_of_questions +
      ",'" +
      name +
      "','" +
      duration +
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
