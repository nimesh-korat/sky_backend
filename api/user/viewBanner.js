const connectDB = require("../../db/dbConnect");

async function GetBanner(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection("banner");

        const banner = await collection.find({ status: "active" }).toArray();


        if (banner.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "Banner not found" });
        }

        res.status(200).json({
            banner,
            success: true,
            message: "Banner fetch Successful",
        });
    } catch (error) {
        console.log("GetBanner.js: ", error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

module.exports = { GetBanner };
