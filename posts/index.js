const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

let posts = {};

app.post("/posts", (req, res) => {
  const id = Math.random().toString(36).substring(2, 7);
  const { title } = req.body;

  posts[id] = { id, title };

  res.status(201).send(posts[id]);
});

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.listen(5000, '0.0.0.0', () => {
  console.log("Posts service running on port 5000");
});

