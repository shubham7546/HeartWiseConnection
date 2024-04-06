// Import the Mongoose library
const mongoose = require("mongoose");

// Define the user schema using the Mongoose Schema constructor
const userSchema = new mongoose.Schema(
	{
		// Define the name field with type String, required, and trimmed
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		// Define the email field with type String, required, and trimmed
		email: {
			type: String,
			required: true,
			trim: true,
		},

		// Define the password field with type String and required
		password: {
			type: String,
			required: true,
		},

		// list of all confirmed appointment of a doc with patients
		appointedPatients: [

			{
				type: mongoose.Schema.Types.ObjectId,
				// required: true,
				ref: "user",
			}

		],

		// list of all patients who has requested an appointment with this doc
		requestedPatients: [

			{
				type: mongoose.Schema.Types.ObjectId,
				// required: true,
				ref: "user",
			}

		],

		// list of all the doctors to which this patient has requested the appointment
		requestedDoctors: [

			{
				type: mongoose.Schema.Types.ObjectId,
				// required: true,
				ref: "user",
			}

		],

		// list of all confirmed appointment of this patient with differnet doctors
		appointedDoctors: [

			{
				type: mongoose.Schema.Types.ObjectId,
				// required: true,
				ref: "user",
			}

		],



		// Field to store generated PDF reports or their references
		reports: [
			{
				type: String, // Assuming the PDFs are stored as file paths
			},
		],
		// Define the role field with type String and enum values of "Admin", "Patient", or "Visitor"
		accountType: {
			type: String,
			enum: ["Admin", "Patient", "Doctor"],
			required: true,
		},
		active: {
			type: Boolean,
			default: true,
		},
		approved: {
			type: Boolean,
			default: true,
		},
		additionalDetails: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Profile",
		},
		courses: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Course",
			},
		],
		token: {
			type: String,
		},
		resetPasswordExpires: {
			type: Date,
		},
		image: {
			type: String,
			// required: true,
		},
		courseProgress: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "courseProgress",
			},
		],

		ratingAndReviews: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "RatingAndReview",
			},
		],
		price: {
			type: Number,
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			// required: true,
			ref: "Category",
		},
		courseName: { type: String },
		courseDescription: { type: String },




		// Add timestamps for when the document is created and last modified
	},
	{ timestamps: true }
);

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("user", userSchema);