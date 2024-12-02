const express = require("express");
const router = express.Router();
const Order = require("../models/order");

// Fetch all orders
router.get(`/`, async (req, res) => {
  try {
    const orders = await Order.find().populate("user orderItems.product"); // Fetch all orders with user and product details
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Fetch a single order by ID
router.get(`/:id`, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user orderItems.product"
    ); // Fetch order by ID with populated details
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Add a new order
router.post(`/`, async (req, res) => {
  try {
    const { orderItems, shippingAddress, phone, status, totalPrice, user } =
      req.body;

    const newOrder = new Order({
      orderItems,
      shippingAddress,
      phone,
      status,
      totalPrice,
      user,
    });

    const savedOrder = await newOrder.save(); // Save order to MongoDB
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update an existing order
router.put(`/:id`, async (req, res) => {
  try {
    const { status, totalPrice } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status, totalPrice },
      { new: true } // Return updated document
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete an order
router.delete(`/:id`, async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id); // Delete order by ID
    if (!deletedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, message: "Order has been deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Fetch orders for a specific user
router.get(`/user/:userId`, async (req, res) => {
  try {
    const userOrders = await Order.find({ user: req.params.userId }).populate(
      "orderItems.product"
    );
    if (!userOrders) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found for this user" });
    }
    res.status(200).json(userOrders);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
