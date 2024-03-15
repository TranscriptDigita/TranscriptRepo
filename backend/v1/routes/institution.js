// ==============================
// ===== library required ======
// =============================
const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/institution'),
    adminController = require('../controllers/admin'),
    accountController = require('../controllers/bankAccount'),
    resultController = require('../controllers/studentsData'),
    { isAuthInstitution } = require('../middleware/auth')

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
    .post(isAuthInstitution, accountController.setupBankAccount)

router.route('/students-records')
    .post(isAuthInstitution, resultController.uploadData)

router.route('/:institutionId/documents-price')
    .get(controller.getAllInstitutionDocumentPrices)

// route to get notifications
router.route('/notifications/:receiver')
    .get(isAuthInstitution, adminController.getAllUserNotifications)

// route to verify login authentication code
router.route('/verify-authentication')
    .post(controller.verifyLoginInstitution)

module.exports = router