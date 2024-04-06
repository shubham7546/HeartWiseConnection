const express = require("express")
const router = express.Router()
const { isPatient, auth } = require("../middlewares/auth");
const { generateReportAndSave } = require("../controllers/Reports")

router.post("/generateReportAndSave", generateReportAndSave);
// router.post("/upload_report_doc", auth, isPatient, upload_report_doc);
`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   `

module.exports = router