const express = require("express");

const app = express();
app.use(express.json());

let tasks = [
  { id: 1, title: "Welcome Kadhar", status: "Open" },
  { id: 2, title: "Build sample pipeline", status: "In Progress" }
];

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(task);
});

app.post("/tasks", (req, res) => {
  const { title, status } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    status: status || "Open"
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const { title, status } = req.body;
  if (title) task.title = title;
  if (status) task.status = status;

  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const existing = tasks.find(t => t.id === id);

  if (!existing) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks = tasks.filter(t => t.id !== id);
  res.status(204).send();
});

module.exports = app;
