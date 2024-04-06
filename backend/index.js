const express = require("express");
const app = express();

// import all the routes (this will tell upon hitting a specific path what middlewares and controllers will be exec)
const userRoutes = require("./routes/User");
const reportsRoutes = require("./routes/Reports")
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
// const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");
const appointmentsRoutes = require("./routes/Appointments")
//import the database file
const database = require("./config/database");
// import the cloudinaryConnect func
const { cloudinaryConnect } = require("./config/cloudinary");
// import middlewares
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database.connect();
//middlewares
app.use(express.json());//to parse json content coming from client to object 
app.use(cookieParser());//to parse cookies that is coming from client

//to let the client share resources with the server
//to let the client share resources with the server
// app.use(
// 	cors({
// 		origin: [process.env.CLIENT_URL, 'https://disease-app-gemini.streamlit.app', "http://localhost:3000"],
// 		credentials: true,
// 	})
// )

app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	})
)


// enables handling file uploads in Express.js applications.
app.use(
	fileUpload({
		useTempFiles: true, //the middleware stores uploaded files in temporary storage during the upload process instead of RAM
		tempFileDir: "/tmp", //specifies the directory where temporary files will be stored
	})
)
//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);
app.use("/api/v1/reports", reportsRoutes);
app.use("/api/v1/appointments", appointmentsRoutes);



//def route

app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: 'Your server is up and running....'
	});
});


app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})

