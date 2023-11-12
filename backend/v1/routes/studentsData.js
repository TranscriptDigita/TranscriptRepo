const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/studentsData'),
    { isAuth } = require('../middleware/auth')

// create and fecth transcript routes
router.route(`/`)
    .post(isAuth, controller.uploadData);
router.route(`/`)
    .get(controller.verifyStudent)

// export router
module.exports = router