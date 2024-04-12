
const mongoose = require("mongoose");

const mondbUrl = "mongodb+srv://adityaastic:RjbH8htMG7LIpqnO@cluster0.fpitoxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDb = () => {
    return mongoose.connect(mondbUrl);
};

module.exports = { connectDb };
