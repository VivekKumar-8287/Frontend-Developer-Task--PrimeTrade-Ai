import express from "express";
import authMiddleware from "../middleware/auth.js";
import Task from "../models/Task.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: "Title required" });

    const task = await Task.create({ title, description, user: req.userId });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    next(err);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
});

router.get("/search", async (req, res) => {
  try {
    const { search } = req.query;
    const userId = req.userId;

    if (!search || search.trim() === "") {
      return res.status(400).json({ message: "Please provide a search query" });
    }

    const tasks = await Task.find({
      user: userId, 
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });

    if (!tasks.length) {
      return res
        .status(404)
        .json({ message: "No tasks found matching your search" });
    }

    return res.json(tasks);
  } catch (err) {
    console.error("Search Error:", err);
    return res.status(500).json({ message: "Error while searching tasks" });
  }
});

export default router;
