const Task = require("../models/taskModel");
const asyncHandler = require("../middleware/asyncHandler");

// @desc Get all notes
// @route GET /api/v1/notes
// @access private
const getTasks = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const tasks = await Task.find({ createdBy: userId });

  if (!tasks) {
    res.status(404).json({ msg: "no tasks" });
  }
  res.status(200).json({ tasks });
});

// @desc Get one note
// @route GET /api/v1/notes/:id
// @access private
const getTask = asyncHandler(async (req, res) => {
  const {
    user: userId,
    params: { id: taskId },
  } = req;
  const task = await Task.findById({ _id: taskId, createdBy: userId });

  if (!task) {
    return res.status(404).json({ msg: "Not note with this id" });
  }

  res.status(200).json({ task });
});

// @desc Create note
// @route POST /api/v1/notes
// @access private
const createTask = asyncHandler(async (req, res) => {
  req.body.createdBy = req.user.userId;
  console.log({ id: req.user });
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

// @desc Update note
// @route PATCH /api/v1/notes/:id
// @access private
const updateTask = asyncHandler(async (req, res) => {
  const {
    user: { userId },
    params: { id: taskID },
  } = req;

  const task = await Task.findByIdAndUpdate(
    { _id: taskID, createdBy: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!task) {
    res.status(404).json("No note with this id");
  }
  res.status(200).json({ task });
});

// @desc Delete note
// @route DELETE /api/v1/notes/:id
// @access private
const deleteTask = asyncHandler(async (req, res) => {
  const {
    user: { userId },
    params: { id: taskID },
  } = req;
  const task = await Task.findByIdAndDelete({ _id: taskID, createdBy: userId });

  if (!task) {
    return res.status(404).json({ msg: "No therer note with this id :(" });
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
