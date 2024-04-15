const { ObjectId } = require("mongodb");
const connectDB = require("../../db/dbConnect");

async function ContactUs(req, res) {
  try {
    const db = await connectDB();
    const collection = db.collection("contactUs");

    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields!" });
    }

    await collection.insertOne({
      name: name,
      email: email,
      phone: phone,
      message: message,
      timestamp: new Date(),
    });

    return res
      .status(201)
      .json({ success: true, message: "Contact Us inserted successfully" });
  } catch (error) {
    console.error("Error in Contact Us:", error);
    return res
      .status(500)
      .json({ success: false, error: "Contact Us Adding Failed" });
  }
}

module.exports = { ContactUs };
