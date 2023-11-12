// ==============================
// ===== library required ======
// =============================
const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/institution'),
    accountController = require('../controllers/bankAccount'),
    resultController = require('../controllers/studentsData'),
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
    .post(isAuth, accountController.setupBankAccount)

router.route('/students-records')
    .post(isAuth, resultController.uploadData)


module.exports = router