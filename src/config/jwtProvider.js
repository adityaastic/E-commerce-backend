const jwt = require("jsonwebtoken");

const SECRET_KEY = "jnasiuywhebruytyfghfytrujasjlkdiua0z9ujknwejhyiueywqjhweui";

const generateToken = (userId) => {
    const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" });
    return token;
}; // Added missing closing brace

const getUserIdFromToken = (token) => {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    return decodedToken.userId;
}; // Added missing closing brace

module.exports = { generateToken, getUserIdFromToken }; // Fixed typo in getUserIdFromToken
