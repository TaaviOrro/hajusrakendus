const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

let commentsByPostId = {};

app.post("/posts/:id/comments", (req, res) => {
  const commentId = Math.random().toString(36).substring(2, 7);
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.listen(5001, '0.0.0.0', () => {
  console.log("Comments service running on port 5001");
});

