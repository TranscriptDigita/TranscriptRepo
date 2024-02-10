const express = require('express'),
    router = express.Router(),
    webhook = require('../controllers/webhook')

router.route(`/payments`)
    .post(webhook)
    // export router
module.exports = router