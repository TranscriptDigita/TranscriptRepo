// =============================
// ==== libraries required =====
// =============================
require('dotenv').config()
const Admin = require('../models/admin'),
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
            throw Error('resource could not be located !!')
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
            throw Error(`resource could ot be located`)
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

// forgot password
exports.forgotPassword = async(req, res) => {
    try {

        // get all info from parameters
        const { emailAddress } = req.body;
        const foundAdmin = await Admin.findOne({ emailAddress });

        // check if email exists in database
        if (!foundAdmin) {
            throw Error('Email does not exist in our database')
        }

        // Generate a reset token
        const resetToken = await generateRandomNumber()

        // Set the reset token and expiration time in the foundAdmin document
        foundAdmin.resetPasswordToken = resetToken;
        foundAdmin.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour

        // save resetToken and expiry date in database
        await foundAdmin.save();

        // send password reset email
        await Admin.sendEmail(emailAddress, 'Reset password', `Password reset link: https://transcript360.onrender.com/admin/reset-password/${resetToken}`)

        // debug here for errors
        return res.status(200).json({ message: `verification email successfully sent`, admin: foundAdmin })

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}


// password reset
exports.passwordReset = async(req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        // find admin using token and expiry time
        const foundAdmin = await Admin.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        // if admin not found throw error
        if (!foundAdmin) {
            throw Error("Password reset token is invalid or has expired");
        }

        // check password strength
        // using validator to check if password is strong
        if (!validator.isStrongPassword(password)) {
            throw Error('password not strong enough')
        }
        // hash password
        // generating salt to hash password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

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
exports.verifyAdmins = async(req, res) => {
    // get adminsId and verificationCode from user parameters

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
        fullName,
        matricNo,
        phoneNumber,
        emailAddress,
        paymentDetails,
        yearOfGraduation,
        monthOfGraduation,
        department
    } = req.body

    try {
        // verify if id is of mongoose type
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('not a valid id')
        }
        // find admins in database the id and update
        let updatedDetails = await Admin.update(id, {
            fullName,
            matricNo,
            phoneNumber,
            emailAddress,
            paymentDetails,
            yearOfGraduation,
            monthOfGraduation,
            department
        });
        // return succesful status code, message and the updated user
        return res.status(200).json({ message: "Admin updated!", Admin: updatedDetails })

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

module.exports = exports