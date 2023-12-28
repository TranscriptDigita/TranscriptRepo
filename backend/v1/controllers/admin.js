// =============================
// ==== libraries required =====
// =============================
require('dotenv').config()
const Admin = require('../models/admin'),
    Alumni = require('../models/alumni'),
    Logs = require('../models/logs'),
    Notifications = require('../models/notifications'),
    Institution = require('../models/institution'),
    Staff = require('../models/staff'),
    Transcripts = require('../models/transcripts'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    validator = require('validator'),
    bcrypt = require('bcryptjs'),
    fs = require('fs')

const htmlContent = fs.readFileSync('./views/welcomeEmail.html', 'utf-8')


// =============================
// === funtion to create token==
// ============================= 
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '1d' })
}

// ===========================================
// ==== function that generates random nums ==
// ===========================================

const generateRandomNumber = () => {
    const length = 5;

    // Generate random number with a specified length
    const randomNumber = Math.floor(Math.random() * 10 ** length);

    // Pad the number with leading zeros to ensure it has exactly five digits
    const formattedNumber = randomNumber.toString().padStart(length, "0");

    return formattedNumber;
}

// =====================================
// ===== Admin controller functions ===
// =====================================

// function to get all Admins
exports.getAllAdmins = async(req, res) => {
    try {

        // find all admin in database
        let allAdmins = await Admin.find({})

        // if not allAdmins throw error 
        if (!allAdmins) {
            throw Error('Resource could not be located !!')
        }

        // return status and data as json
        return res.status(201).json(allAdmins)

    } catch (error) {
        // return status and error as json
        return res.status(403).json({ message: error.message })
    }
}

// function to get single Admin
exports.getAdminById = async(req, res) => {
    const { id } = req.params

    try {
        // verify if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('not a valid id')
        }

        // find admin using db using id
        let admin = await Admin.findById(id)

        // if not found throw error
        if (!admin) {
            throw Error(`Resource could ot be located`)
        }

        // return data and message as json
        res.status(200).json({ message: 'successful', data: admin })

    } catch (error) {
        // return status and error as json
        return res.status(403).json({ message: error.message })
    }
}


//function to create new admin account
exports.createAdmin = async(req, res) => {

    // destructuring request body
    let { emailAddress, password } = req.body

    try {
        // generate verification code
        let verificationCode = await generateRandomNumber()

        // signup user using static function   
        const admin = await Admin.signup(emailAddress, password, verificationCode)

        // create a token
        const token = createToken(admin._id)

        // send welcome email
        await Admin.sendEmail(emailAddress, `Hi ${emailAddress}, welcome to Centralized Academic Credentials Services. You have been added to act as an admin user. Your verfication code is: ${verificationCode}`)

        // return status code and data as json
        return res.status(200).json({ admin: admin, token: token })

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}


// change password
exports.changePassword = async(req, res) => {
    try {
        const { currentPassword, newPassword, confirmNewPassword } = req.body;
        const _id = req.user;

        // find admin using token and expiry time
        const foundAdmin = await Admin.findOne({ _id });

        // if admin not found throw error
        if (!foundAdmin) {
            throw Error("Password reset token is invalid or has expired");
        }

        // check password strength
        // using validator to check if password is strong
        if (!validator.isStrongPassword(newPassword)) {
            throw Error('password not strong enough')
        }
        if (confirmNewPassword != newPassword) {
            throw Error('confirm password do not match!')
        }
        // check if current password entered matchs the one in the database
        let isMatch = bcrypt.compare(currentPassword, foundAdmin.password)
            // hash password
        if (!isMatch) {
            throw Error('Incorrect password entered!')
        }
        // generating salt to hash password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newPassword, salt)

        // Update the foundAdmin's password
        foundAdmin.password = hash;
        foundAdmin.resetPasswordToken = '';
        foundAdmin.resetPasswordExpires = '';

        await foundAdmin.save();

        return res.status(200).json({ message: "Password reset successful", admin: foundAdmin });

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}

// verify a recently registered user
exports.verifyAdmin = async(req, res) => {
    // get adminId and verificationCode from user parameters

    const { verificationCode, id } = req.body

    try {
        // verify if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('not a valid id')
        }

        // find admins in database
        const foundAdmin = await Admin.findById(id)

        // if user not found in database throw error
        if (!foundAdmin) {
            throw Error('This user doesnt exist in our database')
        }

        // not match throw error
        if (verificationCode != foundAdmin.verfificationCode) {
            throw Error('Incorrect verfication code')
        }

        // compare params code with found users verification code
        if (verificationCode === foundAdmin.verfificationCode) {
            let verifiedAdmin = await Admin.findByIdAndUpdate(id, { isVerified: true }, { new: true, useFindAndModify: false })
            return res.status(200).json({ message: 'successfully updated', admin: verifiedAdmin })
        }

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}

// login Admin
exports.loginAdmin = async(req, res) => {
    const { emailAddress, password } = req.body

    try {
        // login admin
        const admin = await Admin.login(emailAddress, password)

        if (!admin) {
            throw Error('Login unsucessful')
        }
        // create a token
        const token = createToken(admin._id)

        return res.status(200).json({ admin, token })

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}

// update admin information
exports.updateAdmin = async(req, res) => {
    const { id } = req.params
    const {
        emailAddress
    } = req.body

    try {
        // verify if id is of mongoose type
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('not a valid id')
        }
        // find admins in database the id and update
        let updatedDetails = await Admin.update(id, {
            emailAddress
        });
        // return succesful status code, message and the updated user
        return res.status(200).json({ message: "Admin user updated!", Admin: updatedDetails })

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}

// delete Admin
exports.deleteAdmin = async(req, res) => {
    const { id } = req.params

    try {
        // verify if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('not a valid id')
        }

        // search admin db and delete item with the id
        let deletedAdmin = await Admin.findByIdAndDelete(id)

        if (!deletedAdmin) {
            throw Error('this resource could not be deleted, it seems it doest exist in our database')
        }

        return res.status(200).json({ message: 'successfully deleted', data: deletedAdmin })

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}

// function to get all logs
exports.getAllLogs = async(req, res) => {
    try {

        // find all admin in database
        let allLogs = await Logs.find({})

        // if not allAdmins throw error 
        if (!allLogs) {
            throw Error('No Resources Found!')
        }

        // return status and data as json
        return res.status(201).json(allLogs)

    } catch (error) {
        // return status and error as json
        return res.status(403).json({ message: error.message })
    }
}

// function to get all alumnus
exports.getAllAlumnus = async(req, res) => {
    try {

        // find all admin in database
        let allAlumnus = await Alumni.find({})

        // if not allAdmins throw error 
        if (!allAlumnus) {
            throw Error('No Resources Found!')
        }

        // return status and data as json
        return res.status(201).json(allAlumnus)

    } catch (error) {
        // return status and error as json
        return res.status(403).json({ message: error.message })
    }
}

// function to fetch all transcripts
exports.fetchAllTranscripts = async(req, res) => {

    try {

        // find all admin in database
        let allTranscripts = await Transcripts.find({})

        // if not allAdmins throw error 
        if (!allTranscripts) {
            throw Error('No Resources Found!')
        }

        // return status and data as json
        return res.status(200).json(allTranscripts)

    } catch (error) {
        // return status and error as json
        return res.status(403).json({ message: error.message })
    }
}


// function to getfilter transcript by institution
exports.filterAlumnusByInstitution = async(req, res) => {
    const { institution } = req.params;
    try {

        // find all admin in database
        let allTranscripts = await Transcripts.find({ institution })

        // if not allAdmins throw error 
        if (!allTranscripts) {
            throw Error('No Resources Found!')
        }

        // return status and data as json
        return res.status(201).json(allTranscripts)

    } catch (error) {
        // return status and error as json
        return res.status(403).json({ message: error.message })
    }
}


// delete alumni
exports.deleteAlumni = async(req, res) => {
    const { id } = req.params

    try {
        // verify if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('not a valid id')
        }

        // search admin db and delete item with the id
        let deletedAlumni = await Alumni.findByIdAndDelete(id)

        if (!deletedAlumni) {
            throw Error('this resource could not be deleted, it seems it doest exist in our database')
        }

        return res.status(200).json({ message: 'successfully deleted' })

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}

//  functoin to fetch all institutions
exports.getAllInstitutions = async(req, res) => {
    try {

        // find all admin in database
        let allInstitution = await Institution.find({})

        // if not allAdmins throw error 
        if (!allInstitution) {
            throw Error('No Resources Found!')
        }

        // return status and data as json
        return res.status(201).json(allInstitution)

    } catch (error) {
        // return status and error as json
        return res.status(403).json({ message: error.message })
    }
}

// function to get all staff
exports.fetchAllStaff = async(req, res) => {

    try {
        // find all admin in database
        let allStaff = await Staff.find({})

        // if not allAdmins throw error 
        if (!allStaff) {
            throw Error('No Resources Found!')
        }

        // return status and data as json
        return res.status(200).json(allStaff)

    } catch (error) {
        // return status and error as json
        return res.status(403).json({ message: error.message })
    }
}
exports.getStaffByInstitution = async(req, res) => {
    try {
        const { institutionId } = req.params
            // verify if id is valid
        if (!mongoose.Types.ObjectId.isValid(institutionId)) {
            throw Error('not a valid id')
        }
        // find all staff in database
        let allStaff = await Staff.find({ institution: institutionId })

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

//=============================
// ==create new notification ==
// ============================
exports.createNewNotification = async(req, res) => {

    try {
        // destructure requestbody
        const { message, receivers } = req.body


        // create new notification
        const newNotifications = await Notifications.sendNotifications(message, receivers)
            // return newly created staff as json
        return res.status(200).json({ newNotifications })

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }

}

// function to get all notifications
exports.getAllNotifications = async(req, res) => {
    try {

        // find all admin in database
        let allNotifications = await Notifications.find({})

        // if not allAdmins throw error 
        if (!allNotifications) {
            throw Error('No Resources Found!')
        }

        // return status and data as json
        return res.status(201).json(allNotifications)

    } catch (error) {
        // return status and error as json
        return res.status(403).json({ message: error.message })
    }
}

// delete notifations
exports.deleteNotification = async(req, res) => {
    const { id } = req.params

    try {
        // verify if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('Not a valid id')
        }

        // search admin db and delete item with the id
        let deletedNotification = await Notifications.findByIdAndDelete(id)

        if (!deletedNotification) {
            throw Error('This resource could not be deleted, it seems it doest exist in our database')
        }

        return res.status(200).json({ message: 'successfully deleted' })

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}

exports.getNotificationById = async(req, res) => {
    try {
        const { id } = req.params
            // verify if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('Not a valid id')
        }
        // find all staff in database
        let notification = await Notifications.findById(id);

        // if not allAlumnus throw error 
        if (!notification) {
            throw Error('Resource could not be located !!')
        }

        // return status and data as json
        return res.status(200).json(notification)

    } catch (error) {
        // return status and error as json
        return res.status(403).json({ message: error.message })
    }
}
module.exports = exports