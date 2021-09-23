const express = require("express");
const app = express();

const PORT = 7000;

app.get("/", async (req, res) => {
  res.send({ Working: "working now" });
});

app.listen(PORT, () => console.log("Server listening on port " + PORT));
