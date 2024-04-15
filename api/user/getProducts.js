const connectDB = require("../../db/dbConnect");

async function GetProducts(req, res) {
  try {
    const db = await connectDB();
    const collection = db.collection("products");

    const products = await collection.find({ status: "active" }).toArray();

    if (products.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Products not found" });
    }

    res.status(200).json({
      products,
      success: true,
      message: "Products fetch Successful",
    });
  } catch (error) {
    console.log("getProducts.js: ", error);
    res.status(500).json({ success: false, message: "Products fetch Failed" });
  }
}

module.exports = { GetProducts };
