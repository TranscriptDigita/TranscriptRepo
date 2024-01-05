// =================================
// ===== required libraries ========
// =================================
const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/staff'),
    { isAuthStaff } = require('../middleware/auth'),
    { isAuthInstitution } = require('../middleware/auth')

// =================================
// ==== Creating new Staff ==========
// ==== Retrieving all Staff =======
// ================================= 
router.route('/')
    .post(isAuthInstitution, controller.createNewStaff)
    .get(isAuthInstitution, controller.getAllStaff)

// ======================================
// ==== Deactivating staff by Id ========
// =====================================
router.route('/:id')
    .patch(isAuthInstitution, controller.deactivateStaff)

// ======================================
// ==== Activating staff by Id ========
// =====================================
router.route('/activate/:id')
    .patch(isAuthInstitution, controller.activateStaff)

// New endpoints
// =================================
// ======= staff login route========
// =================================
router.route('/login')
    .post(controller.loginStaff)

// =================================
// ===staff change password route===
// =================================
router.route('/change-password')
    .patch(isAuthStaff, controller.changePassword)

// =================================
// ==set transcript amount endpoint=
// =================================
router.route('/transcript-charge/:institutionId')
    .patch(isAuthStaff, controller.setAmount)

module.exports = router