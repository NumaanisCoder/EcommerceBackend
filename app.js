const express = require('express');
const connectDB = require('./Database/Connection');

const app = express();
require("dotenv").config(); // Automatically looks for .env in the root directory

connectDB();

app.get('/', (req, res) => {
    res.send({ message: "Hello" });
});

app.listen(3000, () => {
    console.log("Server is live");
});
