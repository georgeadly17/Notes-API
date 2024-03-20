const express = require("express");
const router = express.Router();

const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.route("/tasks").get(getTasks).post(createTask);
router.route("/tasks/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
