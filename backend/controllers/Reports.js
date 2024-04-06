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

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'An error occurred.' });
    }
};






// exports.upload_report_doc = async (req, res) => {

//     // this will let the user upload a existing report present in doc
// }

// exports.view_reports = async (req, res) => {
//     // this will let a appointed doctor see the patient report

//     // this should also let the patient see their own reports
// }
