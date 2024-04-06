// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifyPayment, sendPaymentSuccessEmail } = require("../controllers/Payments")
const { auth, isInstructor, isPatient, isAdmin } = require("../middlewares/auth")
router.post("/capturePayment", auth, isPatient, capturePayment)
router.post("/verifyPayment", auth, isPatient, verifyPayment)
router.post("/sendPaymentSuccessEmail", auth, isPatient, sendPaymentSuccessEmail);

module.exports = router