const connectDB = require("../../db/dbConnect");

async function AddBanner(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('banner');

        const userId = req.session.user;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized User!" });
        }

        const { bannerTitle, bannerDesc } = req.body;

        if (!bannerTitle || !bannerDesc) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }

        await collection.insertOne({
            bannerTitle,
            bannerDesc,
            status: "active",
        });

        return res.status(201).json({ success: true, message: "Banner added successfully" });
    } catch (error) {
        console.error("AddBanner.js: ", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

module.exports = { AddBanner };
