// =================================
// ===== required libraries ========
// =================================
const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/logistic'),
    // logisticController = require('../controllers/logistic'),
    { isAuthCourier } = require('../middleware/auth')

// =================================
// ==== retrieve all Alumnus =======
// ==== create new Alumni ==========
// ==== send reset pwd link ========
// ==== reset password =============
// ================================= 
router.route('/')
    .get(controller.getAllLogistic)
    .post(controller.createLogistic)


router.route('/login')
    .post(controller.loginLogistic)

router.route('/reset-password')
    .post(controller.forgotPassword)

router.route('/reset-password/:token')
    .post(controller.passwordReset);



// ==================================
// === get single alumni ============
// === update alumni details ========
// === delete alumni ================
//  =================================
router.route('/:id')
    .get(controller.getLogisticById)
    .patch(isAuthCourier, controller.updateLogistic)
    .delete(isAuthCourier, controller.deleteLogistic);

router.route('/change-password/:logisticId')
    .patch(isAuthCourier, controller.changePassword);
router.route('/:id/verify')
    .patch(controller.verifyLogistic)

// route to ge t notifications
router.route('/set-price/:id')
    .patch(isAuthCourier, controller.delOptions)

// ruote to fetch all logistics that do internal delivery
router.route('/inter-services')
    .fetch(isAuthCourier, controller.getAllIntOfferLogistics)

module.exports = router