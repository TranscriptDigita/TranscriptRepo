const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/dev-apis'),
    { isAuth } = require('../middleware/auth')

// create API Key routes for developers 
router.route(`/`)
    .post(isAuth, controller.createAPIKeyAPI)
    // create transcripte routes for developers use
router.route(`/:apiKey/transcript`)
    .post(isAuth, controller.createTranscriptAPI)
    // Fetch all institution transcripts api route for developers
router.route(`/:apiKey`)
    .get(controller.getAllTranscriptsAPI)
    // track transcript api route for developers
router.route(`/:apiKey/track`)
    .get(controller.trackTranscriptAPI)
    // verify transcript api routes for developers
router.route(`/:apiKey/:transcriptId/verify`)
    .patch(isAuth, controller.verifyTranscriptAPI)
    // approve transcript api route for developers
router.route(`/:apiKey/:transcriptId/aprove`)
    .patch(isAuth, controller.approveTranscriptAPI)
    // decline transcript api route for developers
router.route(`/:apiKey/:transcriptId/decline`)
    .patch(isAuth, controller.declineTranscriptAPI)
    // querry transcript api route for developers
router.route(`/:apiKey/:transcriptId/query`)
    .patch(isAuth, controller.queryTranscriptAPI)



// export router
module.exports = router