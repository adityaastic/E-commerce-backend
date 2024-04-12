const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwtProvider = require("../config/jwtProvider");

const createUser = async (userData) => {
    try {
        let { firstName, lastName, email, password } = userData;

        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            throw new Error("User already exists with email: " + email);
        }

        // Hash the password
        password = await bcrypt.hash(password, 8);

        // Create the user
        const user = await User.create({ firstName, lastName, email, password });

        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const findUserById = async (userId) => {
    try {
        const user = await User.findById(userId).populate("address");
        if (!user) {
            throw new Error("User not found with id: " + userId);
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found with email: " + email);
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getUserProfileByToken = async (token) => {
    try {
        const userId = jwtProvider.getUserIdFromToken(token);

        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found with id: " + userId);
        }
        
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error(error.message);
    }
};

async function findUserCart(userId) {
    try {
        let cart = await Cart.findOne({ user: userId }).populate('cartItems'); // Assuming 'user' field in Cart model represents userId
        
        let totalPrice = 0;
        let totalItem = 0;

        for (let cartItem of cart.cartItems) {
            totalPrice += cartItem.price;
            totalItem += cartItem.quantity;
        }

        cart.totalPrice = totalPrice;
        cart.totalItem = totalItem;
        cart.discount = totalPrice - cart.discountedPrice; // Assuming 'discountedPrice' field exists in Cart model

        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function addCartItem(userId, req) {
    try {
        const cart = await Cart.findOne({ user: userId });
        const product = await Product.findById(req.productId);

        const isPresent = await CartItem.findOne({ cart: cart._id, product: product._id, userId });

        if (!isPresent) {
            const cartItem = new CartItem({
                product: product._id,
                cart: cart._id,
                quantity: 1,
                userId,
                price: product.price,
                size: req.size,
                discountedPrice: product.discountedPrice
            });

            const createdCartItem = await cartItem.save();
            cart.cartItems.push(createdCartItem);
            await cart.save();
            return "Item added to cart";
        } else {
            return "Item already present in cart";
        }
    } catch (error) {
        throw new Error(error.message);
    }
}


module.exports = { createUser, findUserById, getUserByEmail, getUserProfileByToken, getAllUsers,findUserCart, addCartItem  };
