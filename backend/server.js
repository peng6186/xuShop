const products = require("./data/products.js");
const productRoute = require("./routes/productRoute.js");
const express = require("express");
const dotenv = require("dotenv");
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");

dotenv.config();
const connectDB = require("./config/db.js");
connectDB();

const PORT = process.env.PORT || 8500;

const app = express();
app.get("/", (req, res) => {
  res.send("Hi, there!");
});

app.use("/api/products", productRoute);

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server is running on the port: ${PORT}`));
