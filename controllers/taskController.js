const Task = require("../models/taskModel");
const asyncHandler = require("../middleware/asyncHandler");

// @desc Get all tasks
// @route GET /api/v1/tasks
// @access puplic
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({ tasks });
});

// @desc Get one task
// @route GET /api/v1/tasks/:id
// @access puplic
const getTask = asyncHandler(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findById({ _id: taskID });

  if (!task) {
    return res.status(404).json({ msg: "Not task with this id" });
  }

  res.status(200).json({ task });
});

// @desc Create task
// @route POST /api/v1/tasks
// @access puplic
const createTask = asyncHandler(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

// @desc Update task
// @route PATCH /api/v1/tasks/:id
// @access puplic
const updateTask = asyncHandler(async (req, res) => {
  const { id: taskID } = req.params;

  const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    res.status(404).json("No task with this id");
  }
  res.status(200).json({ task });
});

// @desc Delete task
// @route DELETE /api/v1/tasks/:id
// @access puplic
const deleteTask = asyncHandler(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findByIdAndDelete({ _id: taskID });

  if (!task) {
    return res.status(404).json({ msg: "No therer task with this id :(" });
  }
  res.status(200).json({ task });
});

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
