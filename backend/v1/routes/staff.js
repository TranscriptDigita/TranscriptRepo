// =================================
// ===== required libraries ========
// =================================
const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/staff'),
    { isAuth } = require('../middleware/auth')

// =================================
// ==== Creating new Staff ==========
// ==== Retrieving all Staff =======
// ================================= 
router.route('/')
    .post(isAuth, controller.createNewStaff)
    .get(isAuth, controller.getAllStaff)
    // ======================================
    // ==== Deactivating staff by Id ========
    // =====================================
router.route('/:id')
    .patch(isAuth, controller.deactivateStaff)

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
    .post(isAuth, controller.loginStaff)


module.exports = router