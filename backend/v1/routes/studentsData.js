const express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    controller = require('../controllers/studentsData'),
    { isAuthInstitution, isAuthAdmin } = require('../middleware/auth')

// upload student data and verify certificate routes
router.route(`/`)
    .post(isAuthInstitution, controller.uploadData);
router.route(`/verify`)
    .post(controller.verifyStudent)

router.route(`/results`)
    .get(isAuthAdmin, controller.studentsResult)

router.route(`/students/results`)
    .get(isAuthInstitution, controller.studentsResult)
    // export router
module.exports = router