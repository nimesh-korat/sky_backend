const { ObjectId } = require("mongodb");
const connectDB = require("../../db/dbConnect");

async function UpdateBanner(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('banner');

        const userId = req.session.user;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized User!" });
        }

        const { bannerId, bannerTitle, bannerDesc } = req.body;

        if (!bannerId || !bannerTitle || !bannerDesc) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }

        if (!ObjectId.isValid(bannerId)) {
            return res.status(400).json({ success: false, message: "Invalid banner ID!" });
        }

        const banner = await collection.findOne({
            _id: ObjectId.createFromHexString(bannerId)
        });
        if (!banner) {
            return res.status(404).json({ success: false, message: "Banner not found!" });
        }

        await collection.updateOne({
            _id: ObjectId.createFromHexString(bannerId)
        }, {
            $set: {
                bannerTitle,
                bannerDesc
            }
        });

        return res.status(201).json({ success: true, message: "Banner updated successfully" });
    } catch (error) {
        console.error("UpdateBanner.js: ", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

module.exports = { UpdateBanner };
