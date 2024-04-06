const User = require("../models/User");

exports.viewDoc = async (req, res) => {
    try {
        // Find all users with accountType "Doctor" and populate only necessary fields
        const doctors = await User.find({ accountType: "Doctor" })
            .select("-password") // Exclude the password field
            .exec();

        return res.status(200).json({ success: true, doctors });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
