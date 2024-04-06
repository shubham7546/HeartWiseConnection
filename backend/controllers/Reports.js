const cloudinary = require('cloudinary').v2;
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const pdfkit = require('pdfkit'); // Import pdfkit library
const { validationResult } = require('express-validator');


exports.generateReportAndSave = async (req, res) => {
    try {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract email, password, and report data from req.body
        const { email, password, ...data } = req.body;

        // Check if email or password is missing
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide both email and password.',
            });
        }
        console.log("data", data);

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        // Compare provided password with hashed password in database
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password.',
            });
        }

        // Create a new PDF document in memory
        const doc = new pdfkit();
        // Add content to the PDF
        doc.fontSize(20).text('Report Title', { align: 'center' }).moveDown();
        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                doc.fontSize(12).text(`${key}: ${data[key]}`, { align: 'justify' });
            }
        }
        // End the document
        doc.end();

        // Convert the PDF to a buffer
        const pdfBuffer = await new Promise((resolve, reject) => {
            const buffers = [];
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                resolve(Buffer.concat(buffers));
            });
            doc.on('error', reject);
        });

        // Upload the generated PDF buffer to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload_stream({
            resource_type: 'auto',
        }, async (error, result) => {
            if (error) {
                console.error('Cloudinary upload error:', error);
                return res.status(500).json({ success: false, message: 'An error occurred.' });
            }
            // Push the URL of the uploaded PDF to the user's reports array
            user.reports.push(result.secure_url);
            await user.save();
            // Respond with success message
            res.status(200).json({ success: true, message: 'PDF generated and uploaded successfully.' });
        }).end(pdfBuffer);

        console.log("cloudinaryResponse", cloudinaryResponse);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'An error occurred.' });
    }
};



// exports.viewReports = async (req, res) => {
//     try {
//         const { email } = req.user;

//         console.log("patient_id is :", patient_id);

//         // Find the user by their ID
//         const user = await User.findById(patient_id);

//         // Check if the user exists
//         if (!user) {
//             return res.status(404).json({ success: false, message: 'User not found' });
//         }

//         // Check if the user is a patient or doctor
//         if (user.accountType === 'Doctor') {
//             // If the user is a doctor, they can view reports of appointed patients
//             const appointedPatients = await User.find({ _id: { $in: user.appointedPatient } });

//             // Return the appointed patients and their reports
//             return res.status(200).json({ success: true, data: appointedPatients });
//         } else if (user.accountType === 'Patient') {
//             // If the user is a patient, they can view their own reports
//             return res.status(200).json({ success: true, data: user.reports });
//         } else {
//             // For other user types (e.g., Admin), return an error
//             return res.status(403).json({ success: false, message: 'Unauthorized access' });
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         return res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// };

exports.viewReports = async (req, res) => {
    try {
        const { email } = req.user;
        console.log("email", email);
        console.log("req.user", req.user);

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (user.accountType === 'Doctor') {
            const appointedPatients = await User.find({ _id: { $in: user.appointedPatients } })
                .select('firstName lastName reports'); // Only select necessary fields
            return res.status(200).json({ success: true, data: appointedPatients });
        } else if (user.accountType === 'Patient') {
            return res.status(200).json({ success: true, data: user.reports });
        } else {
            return res.status(403).json({ success: false, message: 'Unauthorized access' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};





exports.viewPatientReports = async (req, res) => {
    try {
        const { doctorId, patientId } = req.body;

        // Check if doctorId and patientId are provided
        if (!doctorId || !patientId) {
            return res.status(400).json({ success: false, message: "Doctor ID and Patient ID are required" });
        }

        // Find the doctor by their ID in the database
        const doctor = await User.findById(doctorId);

        // Check if the doctor exists and is of type "Doctor"
        if (!doctor || doctor.accountType !== "Doctor") {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        // Check if the patient is appointed to this doctor
        const isPatientAppointed = doctor.appointedPatients.includes(patientId);
        if (!isPatientAppointed) {
            return res.status(404).json({ success: false, message: "Patient not appointed to this doctor" });
        }

        // Find the patient by their ID in the database
        const patient = await User.findById(patientId);

        // Check if the patient exists
        if (!patient || patient.accountType !== "Patient") {
            return res.status(404).json({ success: false, message: "Patient not found" });
        }

        // You can return patient's record or other relevant information here
        return res.status(200).json({ success: true, patient });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};


