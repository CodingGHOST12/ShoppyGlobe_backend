const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  addToCart,
  updateCartQuantity,
  removeFromCart,
} = require("../controllers/cartController");

router.post("/cart", protect, addToCart);
router.put("/cart/:id", protect, updateCartQuantity);
router.delete("/cart/:id", protect, removeFromCart);
module.exports = router;
