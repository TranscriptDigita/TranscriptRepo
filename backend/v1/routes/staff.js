// =================================
// ===== required libraries ========
// =================================
const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/staff'),
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
    // ======= staff login route========
    // =================================
router.route('/change/password')
    .post(isAuthInstitution, controller.loginStaff)


module.exports = router