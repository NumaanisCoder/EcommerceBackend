const express = require("express");
const connectDB = require("./Config/db");
const PORT = process.env.PORT || 3000;

const app = express();
require("dotenv").config(); // Automatically looks for .env in the root directory

connectDB();

app.get("/", (req, res) => {
  res.send({ message: "Hello" });
});

app.listen(PORT, () => {
  console.log(`Server is live on PORT: ${PORT}`);
});
