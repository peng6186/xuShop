const productRoute = require("./routes/productRoute.js");
const userRoutes = require("./routes/userRoutes.js");
const express = require("express");
const dotenv = require("dotenv");
const cookie_parser = require("cookie-parser");
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");

dotenv.config();
const connectDB = require("./config/db.js");
connectDB();

const PORT = process.env.PORT || 8500;

const app = express();

// add body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// add cookie parser middleware
app.use(cookie_parser());

app.get("/", (req, res) => {
  res.send("Hi, there!");
});

app.use("/api/products", productRoute);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server is running on the port: ${PORT}`));
