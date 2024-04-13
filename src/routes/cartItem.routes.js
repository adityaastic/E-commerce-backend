// src/routes/cartItem.routes.js
const express = require("express");
const router = express.Router();

const cartItemController = require("../controller/cartItem.controller.js"); // Corrected path
const authenticate = require("../middleware/authenticate.js"); // Corrected path

router.put("/:id", authenticate, cartItemController.updateCartItem); // Removed space
router.delete("/:id", authenticate, cartItemController.removeCartItem); // Removed space

module.exports = router;
