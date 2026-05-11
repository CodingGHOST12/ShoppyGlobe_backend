const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const productExists = await Product.findById(productId);
    if (!productExists)
      return res.status(404).json({ message: "Product does not exist" });

    let cart = await Cart.findOne({ userId: req.user.id });
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId,
      );
      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
      await cart.save();
      return res.status(200).json(cart);
    } else {
      const newCart = await Cart.create({
        userId: req.user.id,
        products: [{ productId, quantity }],
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    next(error);
  }
};

exports.updateCartQuantity = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === req.params.id,
    );
    if (productIndex > -1) {
      cart.products[productIndex].quantity = quantity;
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not in cart" });
    }
  } catch (error) {
    next(error);
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(
      (p) => p.productId.toString() !== req.params.id,
    );
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};
