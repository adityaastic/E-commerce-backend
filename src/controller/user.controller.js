const userService = require("../services/user.service.js");

const getUserProfile = async (req, res) => {
    const jwt = req.headers.authorization?.split(" ")[1]; 
    try {
        // const jwt = req.headers.authorization?.split(" ")[1]; // Fixed optional chaining operator position

        if (!jwt) {
            return res.status(401).send({ error: "Token not found" }); // Changed status to 401 for unauthorized
        }

        const user = await userService.getUserProfileByToken(jwt);

        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).send(users);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}; 

module.exports = { getUserProfile,getAllUsers };
