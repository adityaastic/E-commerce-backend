const Cart = require("../models/cart.model"); // Corrected path

async function createCart(user) {
    try {
        const cart = new Cart({ user });
        const createdCart = await cart.save();
        return createdCart;
    } catch (error) {
        throw new Error(error.message);
    } // Added missing closing brace for try block
}

module.exports = { createCart }; // Moved the export statement outside of the function definition
