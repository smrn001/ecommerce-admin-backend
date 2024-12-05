const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
require("dotenv").config();

const categoryRouter = require("./routers/categories");
const productRouter = require("./routers/products");
const userRouter = require("./routers/users");
const orderRouter = require("./routers/orders");
const bannerRouter = require("./routers/banners");
const brandRouter = require("./routers/brands");
const collectionRouter = require("./routers/collections");
const adminRouter = require("./routers/admins");

const api = process.env.API_URL || "/api";

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("tiny")); // Consider switching to "combined" in production

// Routers
app.use(`${api}/categories`, categoryRouter);
app.use(`${api}/admins`, adminRouter);
app.use(`${api}/products`, productRouter);
app.use(`${api}/users`, userRouter);
app.use(`${api}/orders`, orderRouter);
app.use(`${api}/banners`, bannerRouter);
app.use(`${api}/brands`, brandRouter);
app.use(`${api}/collections`, collectionRouter);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong!" });
});

module.exports = app;
