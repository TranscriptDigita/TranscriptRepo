const express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    controller = require('../controllers/studentsData'),
    { isAuthInstitution } = require('../middleware/auth')

// upload student data and verify certificate routes
router.route(`/`)
    .post(isAuthInstitution, controller.uploadData);
router.route(`/verify`)
    .post(controller.verifyStudent)

// export router
module.exports = router