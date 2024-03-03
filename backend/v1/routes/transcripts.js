const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/transcript'),
    paymentController = require('../controllers/payments'),
    { isAuth, isAuthStaff } = require('../middleware/auth')

// create and fecth transcript routes
router.route(`/`)
    .get(controller.getAllTranscripts)
    .post(isAuth, controller.createNewRequest);

router.route(`/:transcriptId`)
    .get(controller.getTranscriptById)
    .patch(isAuth, controller.deliveryMethod);

// Verify transccript
router.route(`/:referenceId/verify`)
    .get(controller.verifyTranscriptById)

// get transcript by alumni Id route
router.route('/all/:alumniId')
    .get(isAuth, controller.getTranscriptByAlumniId);

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

//get transcript payment deta
router.route('/payment-data/:referenceId')
    .get(paymentController.getPaymentData);

//get transcript payments by institution
router.route('/institution/payments/:institutionId')
    .get(paymentController.getPaymentData);

router.route('/:transcriptId/documents')
    .post(controller.uploadMiddleware);

router.route('/fetchall/:courier')
    .get(controller.fetchTranscriptsByCourier);

router.route('/picked/:transcriptId/:courierId')
    .get(controller.pickedUp);


// export router

module.exports = router