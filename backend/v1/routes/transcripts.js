const express = require('express'),
    router = express.Router(),
<<<<<<< HEAD
    controller = require('../controllers/transcript')

router.route(`/`)
    .get(controller.getAllTranscripts)
    .post(controller.createNewRequest)
    
=======
    controller = require('../controllers/transcript'),
    { isAuth } = require('../middleware/auth')

// create and fecth transcript routes
router.route(`/`)
    .get(controller.getAllTranscripts)
    .post(isAuth, controller.createNewRequest)
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
>>>>>>> origin/godwin
module.exports = router