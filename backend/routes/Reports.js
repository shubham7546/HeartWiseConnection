const express = require("express")
const router = express.Router()
const { isPatient, auth, isDoctor } = require("../middlewares/auth");
const { generateReportAndSave, viewPatientReports, viewReports } = require("../controllers/Reports")

router.post("/generateReportAndSave", generateReportAndSave);
router.post("/viewReports", auth, isPatient, viewReports);
router.post("/viewPatientReports", auth, isDoctor, viewPatientReports);
// router.post("/upload_report_doc", auth, isPatient, upload_report_doc);
`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   `

module.exports = router