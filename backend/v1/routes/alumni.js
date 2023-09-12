// =================================
// ===== required libraries ========
// =================================
const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/alumni'),
<<<<<<< HEAD
    {isAuth} = require('../middleware/auth')
=======
    { isAuth } = require('../middleware/auth')
>>>>>>> origin/godwin

// =================================
// ==== retrieve all Alumnus =======
// ==== create new Alumni ==========
// ==== send reset pwd link ========
// ==== reset password =============
// ================================= 
router.route('/')
    .get(isAuth, controller.getAllAlumnus)
    .post(controller.createAlumni)


router.route('/login')
    .post(controller.loginAlumnus)

router.route('/reset-password')
    .post(controller.forgotPassword)

router.route('/reset-password/:token')
    .post(controller.passwordReset)
<<<<<<< HEAD
    
    
=======


>>>>>>> origin/godwin
// ==================================
// === get single alumni ============
// === update alumni details ========
// === delete alumni ================
//  =================================
router.route('/:id')
    .get(controller.getAlumniById)
<<<<<<< HEAD
    .patch()
=======
    .patch(controller.updateAlumni)
>>>>>>> origin/godwin
    .delete(controller.deleteAlumni)

router.route('/:id/verify')
    .patch(controller.verifyAlumnus)

module.exports = router