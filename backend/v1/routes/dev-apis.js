const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/dev-apis'),
    { isAuth } = require('../middleware/auth')

// create API Key routes for developers 
router.route(`/`)
    .post(controller.createAPIKeyAPI)
    // create transcripte routes for developers use
router.route(`/:apiKey/transcript`)
    .post(controller.createTranscriptAPI)
    // Fetch all institution transcripts api route for developers
router.route(`/:apiKey/transcripts`)
    .get(controller.getAllTranscriptsAPI)
    // track transcript api route for developers
router.route(`/:apiKey/:id/track`)
    .get(controller.trackTranscriptAPI)
    // verify transcript api routes for developers
router.route(`/:apiKey/:transcriptId/verify`)
    .patch(controller.verifyTranscriptAPI)
    // approve transcript api route for developers
router.route(`/:apiKey/:transcriptId/aprove`)
    .patch(controller.approveTranscriptAPI)
    // decline transcript api route for developers
router.route(`/:apiKey/:transcriptId/decline`)
    .patch(controller.declineTranscriptAPI)
    // querry transcript api route for developers
router.route(`/:apiKey/:transcriptId/query`)
    .patch(controller.queryTranscriptAPI)



// export router
module.exports = router