// =============================
// ==== libraries required =====
// =============================
require('dotenv').config()
const Logistic = require('../models/logistic'),
    Logs = require('../models/logs'),
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
// ===== Alumni controller functions ===
// =====================================

// function to get all Logistics
exports.getAllLogistic = async(req, res) => {
    try {

        // find all alumni in database
        let allLogistic = await Logistic.find({})

        // if not allAlumnus throw error 
        if (!allLogistic) {
            throw Error('resource could not be located !!')
        }

        // return status and data as json
        return res.status(201).json(allLogistic)

    } catch (error) {
        // return status and error as json
        return res.status(403).json({ message: error.message })
    }
}

// function to get single Alumni
exports.getLogisticById = async(req, res) => {
    const { id } = req.params

    try {
        // verify if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('not a valid id')
        }

        // find alumni using db using id
        let logistic = await Logistic.findById(id)

        // if not found throw error
        if (!logistic) {
            throw Error(`resource could ot be located`)
        }

        // return data and message as json
        res.status(200).json({ message: 'successful', data: logistic })

    } catch (error) {
        // return status and error as json
        return res.status(403).json({ message: error.message })
    }
}


//function to create new alumni account
exports.createLogistic = async(req, res) => {

    // destructuring request body
    let { businessName, emailAddress, password } = req.body

    try {
        // generate verification code
        let verificationCode = await generateRandomNumber()

        // signup user using static function   
        const logistic = await Logistic.signup(businessName, emailAddress, password, verificationCode)

        // create a token
        const token = createToken(logistic._id)
            // getting the current time
        let logTime = new Date();
        let logger = emailAddress;
        let logType = "signup";
        let logerType = "Logistic";
        // tracking the sign up time
        const feedback = await Logs.logging(logger, logTime, logType, logerType);
        console.log(feedback);

        // send welcome email
        await Logistic.sendEmail(emailAddress, `Hi ${businessName}, welcome to Centralized Academic Credentials Services. Your verfication code is: ${verificationCode}`)

        // return status code and data as json
        return res.status(200).json({ logistic: logistic, token: token })

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
        const foundLogistic = await Logistic.findOne({ emailAddress });

        // check if email exists in database
        if (!foundLogistic) {
            throw Error('Email does not exist in our database')
        }

        // Generate a reset token
        const resetToken = await generateRandomNumber()

        // Set the reset token and expiration time in the foundAlumni document
        foundLogistic.resetPasswordToken = resetToken;
        foundLogistic.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour

        // save resetToken and expiry date in database
        await foundLogistic.save();

        // send password reset email
        await Logistic.sendEmail(emailAddress, 'Reset password', `Password reset link: https://transcript360.onrender.com/courier/reset-password/${resetToken}`)

        // debug here for errors
        return res.status(200).json({ message: `verification email successfully sent`, logistic: foundLogistic })

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

        // find alumni using token and expiry time
        const foundLogistic = await Alumni.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        // if alumni not found throw error
        if (!foundLogistic) {
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

        // Update the foundLogistic's password
        foundLogistic.password = hash;
        foundLogistic.resetPasswordToken = '';
        foundLogistic.resetPasswordExpires = '';

        await foundLogistic.save();

        return res.status(200).json({ message: "Password reset successful", logistic: foundLogistic });

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}

// change password
exports.changePassword = async(req, res) => {
    try {
        const _Id = req.params.logisticId;
        const { newPassword, confirmNewPassword } = req.body;

        // find alumni using Id
        const foundLogistic = await Alumni.findById(_id);

        // if alumni not found throw error
        if (!foundLogistic) {
            throw Error("No record found with that alumni Id.");
        }

        // if alumni not found throw error
        if (newPassword != confirmNewPassword) {
            throw Error("Password passwords do not match!");
        }

        // check password strength
        // using validator to check if password is strong
        if (!validator.isStrongPassword(newPassword)) {
            throw Error('password not strong enough')
        }
        // hash password
        // generating salt to hash password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newPassword, salt)

        await foundLogistic.save();

        return res.status(200).json({ message: "Password reset successful", alumni: foundLogistic });

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}


// verify a recently registered courier
exports.verifyLogistic = async(req, res) => {
    // get logisticId and verificationCode from user parameters
    const { id } = req.params;
    const { verificationCode } = req.body

    try {
        // verify if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('Not a valid id')
        }

        // find logistic in database
        const foundLogistic = await Logistic.findById(id)

        // if user not found in database throw error
        if (!foundLogistic) {
            throw Error('This user doesnt exist in our database')
        }

        // not match throw error
        if (verificationCode != foundLogistic.verfificationCode) {
            throw Error('Incorrect verfication code')
        }

        // compare params code with found users verification code
        if (verificationCode === foundLogistic.verfificationCode) {
            let verifiedLogistic = await Logistic.findByIdAndUpdate(id, { isVerified: true }, { new: true, useFindAndModify: false })
            return res.status(200).json({ message: 'successfully verified and updated', logistic: verifiedLogistic })
        }

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}

// login courier service
exports.loginLogistic = async(req, res) => {
    const { emailAddress, password } = req.body

    try {
        // login courier service
        const logistic = await Logistic.login(emailAddress, password)

        if (!logistic) {
            throw Error('Login unsucessful')
        }
        // create a token
        const token = createToken(logistic._id);
        // getting the current time
        let logTime = new Date();
        let logger = emailAddress;
        let logType = "signin"
        let logerType = "Courier Service"
            // tracking the sign up time
        const feedback = await Logs.logging(logger, logTime, logType, logerType);
        console.log(feedback);

        return res.status(200).json({ logistic, token })

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}

// courier KYC information
exports.updateLogistic = async(req, res) => {
    const { id } = req.params
    const {
        headOfficeAddress,
        contactPhoneNumber,
        businessRegistrationNumber,
        directorName,
        directorContactNumber,
        directorIdType,
        directorIdNumber
    } = req.body

    try {
        // verify if id is of mongoose type
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('Not a valid id')
        }
        // find alumnus in database the id and update
        let updatedDetails = await Logistic.update(id, {
            headOfficeAddress,
            contactPhoneNumber,
            businessRegistrationNumber,
            directorName,
            directorContactNumber,
            directorIdType,
            directorIdNumber
        });
        // return succesful status code, message and the updated user
        return res.status(200).json({ message: `Details submitted, kindly upload the director's ${directorIdType} to complete your KYC process.`, data: updatedDetails })

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}

// delete logistic
exports.deleteLogistic = async(req, res) => {
    const { id } = req.params

    try {
        // verify if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('not a valid id')
        }

        // search alumni db and delete item with the id
        let deletedLogistic = await Logistic.findByIdAndDelete(id)

        if (!deletedLogistic) {
            throw Error('this resource could not be deleted, it seems it doest exist in our database')
        }

        return res.status(200).json({ message: 'successfully deleted', data: deletedLogistic })

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}

module.exports = exports