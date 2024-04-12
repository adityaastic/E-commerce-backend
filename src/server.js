const app = require("./index"); // Corrected the path to index.js
const { connectDb } = require("./config/db");

const PORT = 5454;

app.listen(PORT, async () => {
  await connectDb();
  console.log("Ecommerce API listening on PORT:", PORT);
});
