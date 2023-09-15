const productRoute = require("./routes/productRoute.js");
const userRoutes = require("./routes/userRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const uploadRoutes = require("./routes/uploadRoutes.js");
const express = require("express");
const path = require("path");
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

// app.get("/", (req, res) => {

// });

app.use("/api/products", productRoute);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_SELLER_ID })
);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("/", (req, res) =>
    res.sendFile(path.resolve(__dirname, "/frontend", "dist", "index.html"))
  );
  console.log("production mode");
} else {
  const __dirname = path.resolve();
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server is running on the port: ${PORT}`));
