const userService = require("../services/user.service.js"); // Corrected path
const jwtProvider = require("../config/jwtProvider.js"); // Corrected path
const bcrypt = require("bcrypt")
const cartService = require("../services/cart.service.js")
const register = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        const jwt = jwtProvider.generateToken(user._id); // Removed space before _id

        // await cartService.createCart(user);

        return res.status(200).send({ jwt, message: "register success" }); // Added space before ._id

    } catch (error) {
        return res.status(500).send({ error: error.message }); // Corrected syntax
    }
};

const login = async (req, res) => {
    const { password, email } = req.body;
    try {
        const user = await userService.getUserByEmail(email);

        if (!user) {
            return res.status(404).send({ message: 'User not found with email:', email }); // Corrected message format
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ message: "Invalid password...." }); // Removed ellipsis
        }

        // If the password is valid, generate JWT token and send it back to the client
        const jwt = jwtProvider.generateToken(user._id); // Assuming you have jwtProvider imported correctly

        return res.status(200).send({ jwt, message: "Login success" }); // Added message for success
    } catch (error) {
        return res.status(500).send({ error: error.message }); // Corrected syntax and added error message
    }
};

module.exports={register,login}