const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/transcript'),
    { isAuth, isAuthStaff } = require('../middleware/auth')

// create and fecth transcript routes
router.route(`/`)
    .get(controller.getAllTranscripts)
    .post(isAuth, controller.createNewRequest);
router.route(`/:transcriptId`)
    .get(controller.getTranscriptById)

// track transcript route
router.route(`/track`)
    .get(controller.trackTranscript)
    // verify transcript route
router.route(`/verify/:id`)
    .patch(isAuthStaff, controller.verifyTranscript)
    // approve transcript route
router.route(`/approve/:id`)
    .patch(isAuthStaff, controller.approveTranscript)
    // decline transcript route
router.route(`/decline/:id`)
    .patch(isAuthStaff, controller.declineTranscript)
    // querry transcript route 
router.route(`/query/:id`)
    .patch(isAuthStaff, controller.querryTranscript)

// set up transcript delivery method
router.route(`/delivery-method/:transcriptId`)
    .patch(isAuth, controller.deliveryMethod)
    // export router
module.exports = router