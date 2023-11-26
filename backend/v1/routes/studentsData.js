const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/studentsData'),
    { isAuth } = require('../middleware/auth')

// upload student data and verify certificate routes
router.route(`/`)
    .post(isAuth, controller.uploadData);
router.route(`/`)
    .get(controller.verifyStudent)

// export router
module.exports = router