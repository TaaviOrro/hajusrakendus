const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

let posts = {};

app.post("/posts", async (req, res) => {
  const id = Math.random().toString(36).substring(2, 7);
  const { title } = req.body;

  posts[id] = { id, title };

  // 👉 SAADA SÜNDMUS EVENT-BUSILE
  await axios.post("http://localhost:5005/events", {
    type: "PostCreated",
    data: { id, title }
  }).catch(err => {
    console.log("Error sending event:", err.message);
  });

  res.status(201).send(posts[id]);
});

app.get("/posts", (req, res) => {
  res.send(posts);
});

// 👉 VÕTA EVENT-BUSILT SÜNDMUS VASTU
app.post("/events", (req, res) => {
  console.log("Posts service received event:", req.body.type);
  res.send({});
});

app.listen(5000, '0.0.0.0', () => {
  console.log("Posts service running on port 5000");
});
