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

// New routes
/* ======================================
=========== fetch logs route===========*/
router.route('/logs')
    .get(isAuthAdmin, controller.getAllLogs)

/* ======================================
=========== fetch alumnus route=========*/
router.route('/all_alumnus')
    .get(controller.getAllAlumnus)

/* ======================================
===filter alumnus by institution route ==*/
router.route('/:institutionId/alumnus')
    .get(isAuthAdmin, controller.filterAlumnusByInstitution)

/* ======================================
=========== delete alumni by id route=========*/
router.route('/delete-alumin/:id')
    .delete(isAuthAdmin, controller.deleteAlumni)

/* ======================================
=========== fetch alumnus route========= */
router.route('/institions')
    .get(isAuthAdmin, controller.getAllInstitutions)

module.exports = router