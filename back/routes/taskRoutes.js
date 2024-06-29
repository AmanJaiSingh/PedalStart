const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Retrieve all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new task
router.post("/tasks", async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Retrieve a single task by its ID
router.get("/tasks/:id", getTask, (req, res) => {
  res.status(200).json(res.task);
});

// Update an existing task
router.put("/tasks/:id", getTask, async (req, res) => {
  if (req.body.title != null) {
    res.task.title = req.body.title;
  }
  if (req.body.description != null) {
    res.task.description = req.body.description;
  }
  if (req.body.completed != null) {
    res.task.completed = req.body.completed;
  }
  if (req.body.dueDate != null) {
    res.task.dueDate = req.body.dueDate;
  }

  try {
    const updatedTask = await res.task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a task
router.delete("/tasks/:id", getTask, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getTask(req, res, next) {
  let task;
  try {
    task = await Task.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: "Cannot find task" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.task = task;
  next();
}

module.exports = router;
