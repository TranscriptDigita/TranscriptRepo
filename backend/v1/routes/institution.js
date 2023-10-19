// ==============================
// ===== library required ======
// =============================
const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/institution'),
    { isAuth } = require('../middleware/auth')

// =============================
// ======= routes ==============
// ============================= 
router.route('/')
    .get(controller.getAllInstitutions)
    .post(controller.registerInstitution)

router.route('/login')
    .post(controller.loginInstitution)
router.route('/:id/verify')
    .post(controller.verifyInstitution)
    //============================
    // =======New endpoints========
router.route('/account')
    .post(isAuth, controller.setupBankAccountDetails)

module.exports = router