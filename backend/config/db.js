const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "e-commerce",
    });
    console.log("Database connection is ready...");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = connectDB;