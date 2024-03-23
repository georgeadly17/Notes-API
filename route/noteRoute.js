const express = require("express");
const router = express.Router();

const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/noteController");

router.route("/notes").get(getTasks).post(createTask);
router.route("/notes/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
