const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/transcript'),
    { isAuth } = require('../middleware/auth')

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
    .patch(isAuth, controller.verifyTranscript)
    // approve transcript route
router.route(`/approve/:id`)
    .patch(isAuth, controller.approveTranscript)
    // decline transcript route
router.route(`/decline/:id`)
    .patch(isAuth, controller.declineTranscript)
    // querry transcript route
router.route(`/query/:id`)
    .patch(isAuth, controller.querryTranscript)

// export router
module.exports = router