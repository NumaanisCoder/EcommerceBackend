const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected with Database");
    } catch (e) {
        console.log("Error while connecting to Database");
        console.error(e);
    }
};

module.exports = connectDB;


