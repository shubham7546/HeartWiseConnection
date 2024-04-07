const User = require("../models/User");

exports.req_appointment = async (req, res) => {
    try {
        // Extract the email and doctorId from the request body
        const { email } = req.user;
        const { doctorId } = req.body;

        // Check if doctorId is provided
        if (!doctorId) {
            return res.status(400).json({ success: false, message: "Doctor ID is required" });
        }

        // Find the doctor by their ID in the database
        const doctor = await User.findById(doctorId);
        if (!doctor || doctor.accountType !== "Doctor") {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        // Find the patient by email in the database
        const patient = await User.findOne({ email: email });
        if (!patient || patient.accountType !== "Patient") {
            return res.status(404).json({ success: false, message: "Patient not found" });
        }

        // Push the appointment request to the doctor's requestedPatients array
        doctor.requestedPatients.push(patient._id);
        await doctor.save();

        // Push the doctor's ID to the patient's requestedDoctors array
        patient.requestedDoctors.push(doctorId);
        await patient.save();

        return res.status(200).json({ success: true, message: "Appointment request sent successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};


// this will let a doctor confirm reqested appointment with a patient

exports.confirm_appointment = async (req, res) => {
    try {
        const { email } = req.user;

        console.log("inside confirming appointment");
        // Check if patientId and doctorId are provided
        if (!patientId || !doctorId) {
            return res.status(400).json({ success: false, message: "Patient ID and Doctor ID are required" });
        }

        // Find the doctor by their ID in the database
        const doctor = await User.findById(doctorId);

        // Check if the doctor exists
        if (!doctor || doctor.accountType !== "Doctor") {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }


        // Check if the patient exists in the doctor's requestedPatients list
        const patientIndex = doctor.requestedPatients.indexOf(patientId);
        if (patientIndex === -1) {
            return res.status(404).json({ success: false, message: "Patient not found in doctor's requested patients list" });
        }

        // Move the patient ID from requestedPatients to appointedPatients
        doctor.requestedPatients.splice(patientIndex, 1); // Remove patient from requestedPatients
        doctor.appointedPatients.push(patientId); // Add patient to appointedPatients
        await doctor.save();

        // Find the patient by their ID in the database
        const patient = await User.findById(patientId);

        // Check if the patient exists
        if (!patient || patient.accountType !== "Patient") {
            return res.status(404).json({ success: false, message: "Patient not found" });
        }

        // Initialize requestedDoctors array if not already present
        if (!patient.requestedDoctors) {
            patient.requestedDoctors = [];
        }

        // Check if the doctor exists in the patient's requestedDoctors list
        const doctorIndex = patient.requestedDoctors.indexOf(doctorId);
        if (doctorIndex === -1) {
            return res.status(404).json({ success: false, message: "Doctor not found in patient's requested doctors list" });
        }

        // Move the doctor ID from requestedDoctors to appointedDoctor
        patient.requestedDoctors.splice(doctorIndex, 1); // Remove doctor from requestedDoctors
        patient.appointedDoctors.push(doctorId); // Add doctor to appointedDoctor
        await patient.save();

        return res.status(200).json({ success: true, message: "Appointment confirmed successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};




exports.view_appointed_doctors = async (req, res) => {
    try {
        const { email } = req.user;
        // Find the patient by their ID in the database and populate the appointedDoctors field
        const patient = await User.findOne({ email })
            .populate({
                path: 'appointedDoctors',
                select: '-password', // Exclude the password field from the populated data
            })
            .exec();

        // Check if the patient exists
        if (!patient) {
            return res.status(404).json({ success: false, message: "Patient not found" });
        }

        // Extract the populated appointedDoctors data
        const appointedDoctors = patient.appointedDoctors;

        return res.status(200).json({ success: true, appointedDoctors });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};



exports.view_appointed_patient = async (req, res) => {
    try {
        // Find the doctor by their ID in the database and populate the appointedPatients field
        const doctor = await User.findById(req.body.doctorId)
            .populate({
                path: 'appointedPatients',
                select: '-password', // Exclude the password field from the populated data
            })
            .exec();

        // Check if the doctor exists
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        // Extract the populated appointedPatients data
        const appointedPatients = doctor.appointedPatients;

        return res.status(200).json({ success: true, appointedPatients });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};


