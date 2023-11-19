// =================================
// ===== required libraries ========
// =================================
const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/admin'),
    { isAuthAdmin } = require('../middleware/auth')

// =================================
// ==== retrieve all Alumnus =======
// ==== create new Alumni ==========
// ==== send reset pwd link ========
// ==== reset password =============
// ================================= 
router.route('/')
    .get(isAuthAdmin, controller.getAllAdmins)
    .post(controller.createAdmin);


router.route('/login')
    .post(controller.loginAdmin)

router.route('/reset-password')
    .post(controller.forgotPassword)

router.route('/reset-password/:token')
    .post(controller.passwordReset)


// ==================================
// === get single alumni ============
// === update alumni details ========
// === delete alumni ================
//  =================================
router.route('/:id')
    .get(controller.getAdminById)
    .patch(isAuthAdmin, controller.updateAdmin)
    .delete(isAuthAdmin, controller.deleteAdmin)

router.route('/:id/verify')
    .patch(controller.verifyAdmin)

module.exports = router