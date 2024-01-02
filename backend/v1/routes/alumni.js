// =================================
// ===== required libraries ========
// =================================
const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/alumni'),
    accountController = require('../controllers/bankAccount'),
    { isAuth } = require('../middleware/auth')

// =================================
// ==== retrieve all Alumnus =======
// ==== create new Alumni ==========
// ==== send reset pwd link ========
// ==== reset password =============
// ================================= 
router.route('/')
    .get(isAuth, controller.getAllAlumnus)
    .post(controller.createAlumni)


router.route('/login')
    .post(controller.loginAlumnus)

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
    .get(controller.getAlumniById)
    .patch(isAuth, controller.updateAlumni)
    .delete(isAuth, controller.deleteAlumni);

router.route('/change-password/:alumniId')
    .patch(isAuth, controller.changePassword);
router.route('/:id/verify')
    .patch(controller.verifyAlumnus)

// route to get notifications
router.route('/notifications')
    .get(isAuth, adminController.getAllUserNotifications)

module.exports = router