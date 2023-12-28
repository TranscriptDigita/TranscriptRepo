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
router.route('/all/logs')
    .get(isAuthAdmin, controller.getAllLogs)

/* ======================================
=========== fetch alumnus route=========*/
router.route('/all/alumnus')
    .get(isAuthAdmin, controller.getAllAlumnus)

/* ======================================
=========== fetch alumnus route=========*/
router.route('/all/transcripts')
    .get(isAuthAdmin, controller.fetchAllTranscripts)

/* ======================================
===filter transcript by institution route ==*/
router.route('/:institution/transcripts')
    .get(isAuthAdmin, controller.filterAlumnusByInstitution)

/* ======================================
=========== delete alumni by id route=========*/
router.route('/delete/alumin/:id')
    .delete(isAuthAdmin, controller.deleteAlumni)

/* ======================================
=========== fetch alumnus route========= */
router.route('/all/institions')
    .get(isAuthAdmin, controller.getAllInstitutions)

// =================================
// ========Fetch all staff ==========
// ================================
router.route('/staff/list')
    .get(isAuthAdmin, controller.fetchAllStaff)

// =================================
// ========Fetch all staff ==========
// ================================
router.route('/:institutionId/staff/list')
    .get(isAuthAdmin, controller.getStaffByInstitution)

// =================================
// ========Create and Fetch Notifications Endpoints ==========
// ================================
router.route('/notifications')
    .post(isAuthAdmin, controller.createNewNotification)
    .get(isAuthAdmin, controller.getAllNotifications)

// =================================
// ========Fetch and Delete Notification By Id ======
// ================================
router.route('/notifications/:id')
    .get(isAuthAdmin, controller.getNotificationById)
    .delete(isAuthAdmin, controller.deleteNotification)
    .patch(isAuthAdmin, controller.UpdateNotification)

module.exports = router