const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(cors());

// PÕHI-ANDMESTIK
let posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

// SÜNDMUSTE KÄITLEMINE
app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId } = data;
    posts[postId].comments.push({ id, content });
  }

  res.send({});
});

app.listen(5002, () => {
  console.log("Query service running on 5002");
});
