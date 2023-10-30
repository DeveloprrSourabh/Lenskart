const mongoose = require("mongoose");
require("dotenv").config();

const connectToMongo = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(console.log("Connected to Successfully"))
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectToMongo;
