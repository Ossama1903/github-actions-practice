const express = require("express");
const app = express();

app.use(express.json());

let users = [];
let id = 0;

app.post("/users", (req, res) => {
  const user = { id: ++id, name: req.body.name };
  users.push(user);
  res.status(201).send(user);
});

app.get("/users", (req, res) => {
  res.status(200).send(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send({ error: "User not found" });
  res.status(200).send(user);
});

app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send({ error: "User not found" });
  user.name = req.body.name;
  res.status(200).send(user);
});

app.delete("/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1)
    return res.status(404).send({ error: "User not found" });
  users.splice(userIndex, 1);
  res.status(204).send();
});

module.exports = app;
