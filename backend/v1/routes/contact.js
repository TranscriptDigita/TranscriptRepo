const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/contact')

router.route(`/`)
    .post(controller.contactUs)

module.exports = router