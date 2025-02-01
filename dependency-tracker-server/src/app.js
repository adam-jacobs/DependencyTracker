const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.json({ message: "Welcome to the home page." });
});

app.listen(5000, () => {
  console.log("server running on localhost:5000");
});
