const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("trying to connect db...");
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
