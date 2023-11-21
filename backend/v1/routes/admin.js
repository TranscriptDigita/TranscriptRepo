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
    .post(isAuthAdmin, controller.createAdmin);


router.route('/login')
    .post(controller.loginAdmin)

router.route('/change-password')
    .patch(isAuthAdmin, controller.changePassword)


// ==================================
// === get single admin user ============
// === update admin user details ========
// === delete admin use ================
//  =================================
router.route('/:id')
    .get(isAuthAdmin, controller.getAdminById)
    .patch(isAuthAdmin, controller.updateAdmin)
    .delete(isAuthAdmin, controller.deleteAdmin)


module.exports = router