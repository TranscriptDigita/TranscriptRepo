// =============================
// ======== libraries required =
// =============================
require('dotenv').config()
const Staff = require('../models/staff'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    validator = require('validator'),
    bcrypt = require('bcryptjs')

// const htmlContent = fs.readFileSync('./views/welcomeEmail.html', 'utf-8')


// =============================
// === funtion to create token==
// ============================= 
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '1d' })
}

//=============================
// =====create new staff ======
// ============================
exports.createNewStaff = async(req, res) => {

        try {
            // destructure requestbody
            const { emailAddress, role, password } = req.body

            // getting the institution Id from the database
            let institution = req.user._id
            console.log(password);
            // signup user using statics func
            const newStaff = await Staff.createStaff(emailAddress, password, role, institution)
                // return newly created staff as json
            return res.status(200).json({ newStaff })

        } catch (error) {
            // return error code and message 
            return res.status(400).json({ message: error.message })
        }

    }
    // function to get all Staff
exports.getAllStaff = async(req, res) => {
    try {
        const institution = req.user._id
            // find all staff in database
        let allStaff = await Staff.fetchAllStaff(institution)

        // if not allAlumnus throw error 
        if (!allStaff) {
            throw Error('resource could not be located !!')
        }

        // return status and data as json
        return res.status(200).json(allStaff)

    } catch (error) {
        // return status and error as json
        return res.status(403).json({ message: error.message })
    }
}


// Deactivating staff
exports.deactivateStaff = async(req, res) => {
    try {
        // get staffId from user parameters
        const { id } = req.params
            // Deactivating staff
        let deactivatedStaff = await Staff.deactivateStaffById(id)
        return res.status(200).json({ message: 'Staff has been succefully deactivated', deactivatedStaff });
    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}

// Activating staff
exports.activateStaff = async(req, res) => {
        try {
            // get staffId from user parameters
            const { id } = req.params
                // Deactivating staff
            let activatedStaff = await Staff.activateStaffById(id)
            return res.status(200).json({ message: 'Staff has been succefully activated', activatedStaff });
        } catch (error) {
            // return error code and message 
            return res.status(400).json({ message: error.message })
        }
    }
    // login staff
exports.loginStaff = async(req, res) => {
        const { emailAddress, password } = req.body;
        try {
            console.log(emailAddress, password)
                // login staff
            const staff = await Staff.login(emailAddress, password);

            if (!staff) {
                throw Error('Incorrect login credentials entered!')
            }
            // create a token
            const token = createToken(staff._id);
            return res.status(200).json({ staff, token });

        } catch (error) {
            // return error code and message 
            return res.status(400).json({ message: error.message });
        }
    }
    // change password
exports.changePassword = async(req, res) => {
    try {

        const { newPassword, confirmNewPassword } = req.body;
        const id = req.user;
        // find staff using token and expiry time
        const foundStaff = await Staff.findOne({ _id: id });

        // if staff not found throw error
        if (!foundStaff) {
            throw Error("Incorrect staff id");
        }

        // check password strength
        // using validator to check if password is strong
        if (!validator.isStrongPassword(newPassword)) {
            throw Error('password not strong enough')
        }
        if (newPassword != confirmNewPassword) {
            throw Error("Confirm password do not match!")
        }
        // hash password
        // generating salt to hash password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newPassword, salt)

        // Update the found staff's password
        foundStaff.password = hash;


        await foundStaff.save();

        return res.status(200).json({ message: "Password successfully changed", staff: foundStaff });

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}




module.exports = exports