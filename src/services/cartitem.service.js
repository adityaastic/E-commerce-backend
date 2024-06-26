const userService = require("../services/user.service.js");

async function updateCartItem(userId, cartItemId, cartItemData) {
    try {
        const item = await findCartItemById(cartItemId);

       

        const user = await userService.findUserById(item.userId);

        if (!user) {
            throw new Error("User not found: " + userId);
        }

        if (user._id.toString() === userId.toString()) {
            item.quantity = cartItemData.quantity;
            item.price = item.quantity * item.product.price;
            item.discountedPrice = item.quantity * item.product.discountedPrice;
            const updatedCartItem = await item.save();
            return updatedCartItem;
        } else {
            throw new Error("You can't update this cart item");
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

async function removeCartItem(userId, cartItemId) {
    try {
        const cartItem = await findCartItemById(cartItemId);
        const user = await userService.findUserById(userId);

        if (user._id.toString() === cartItem.userId.toString()) {
         return   await CartItem.findByIdAndDelete(cartItemId).populate("product");
        } else {
            throw new Error("You can't remove another user's item");
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

async function findCartItemById(cartItemId) {
    try {
        const cartItem = await CartItem.findById(cartItemId);
        if (cartItem) {
            return cartItem;
        } else {
            throw new Error("Cart item not found with id: " + cartItemId);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    updateCartItem,
    removeCartItem,
    findCartItemById
};
