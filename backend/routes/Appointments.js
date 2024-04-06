const express = require("express")
const router = express.Router()
const { isPatient, auth, isDoctor } = require("../middlewares/auth");
const { req_appointment, confirm_appointment, view_appointed_doctors, view_appointed_patient } = require("../controllers/Appoinment");
const { route } = require("./User");

// additional feature
// router.post("/upload_report_doc", auth, isPatient, upload_report_doc);

router.post("/req_appointment", auth, isPatient, req_appointment);
router.get("/view_appointed_doctors", auth, isPatient, view_appointed_doctors);
router.post("/view_appointed_patient", auth, isPatient, view_appointed_patient);
router.post("/confirm_appointment", auth, isDoctor, confirm_appointment)

module.exports = router