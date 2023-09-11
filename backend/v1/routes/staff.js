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

// ==== Deactivating staff by Id ========
router.route('/:id')
    .patch(controller.deactivateStaff)


module.exports = router