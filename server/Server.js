const express = require("express");
require("dotenv").config();
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const connectToMongo = require("./config/db");
const app = express();

app.use(express.json());
app.use(cors());

// Database connection
connectToMongo();

// User Route
app.use("/api/v1/auth/", userRoute);

// Category Route
app.use("/api/v1/category/", categoryRoute);

// Product Route
app.use("/api/v1/product/", productRoute);

// Listen server
app.listen(process.env.PORT, () => {
  console.log(`Server is Running on Port  ${process.env.PORT}`);
});
