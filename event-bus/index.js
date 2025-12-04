const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const event = req.body;

  console.log("Event Received:", event.type);

  // Saada sündmus posts teenusele
  await axios.post("http://localhost:5000/events", event).catch(() => {});

  // Saada sündmus comments teenusele
  await axios.post("http://localhost:5001/events", event).catch(() => {});

  await axios.post("http://localhost:5002/events", event).catch(() => {});

  res.send({ status: "OK" });
});

app.listen(5005, () => {
  console.log("Event Bus listening on 5005");
});
