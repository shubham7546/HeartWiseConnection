const User = require("../models/User");

exports.ExploreDoc = async (req, res) => {
    try {
        // console.log("inside viewdocs");
        const { email } = req.user;
        // console.log("patient.requestedDoctors", email)

        // Find the patient by their email
        const patient = await User.findOne({ email });

        // Check if the patient exists
        if (!patient || patient.accountType !== 'Patient') {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }


        // Find all users with accountType "Doctor" who are not in the requestedDoctors array of the patient
        const doctors = await User.find({ accountType: "Doctor", _id: { $nin: patient.requestedDoctors } })
            .select("-password") // Exclude the password field
            .exec();

        return res.status(200).json({ success: true, doctors });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
