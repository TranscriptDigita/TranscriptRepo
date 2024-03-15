// =============================
// ==== libraries required =====
// =============================
require('dotenv').config()
const Alumni = require('../models/alumni'),
    Logs = require('../models/logs'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    validator = require('validator'),
    bcrypt = require('bcryptjs'),
    fs = require('fs'),
    sendSMS = require('./twilio');

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

// function to get all Alumnus
exports.getAllAlumnus = async(req, res) => {
    try {

        // find all alumni in database
        let allAlumnus = await Alumni.find({})

        // if not allAlumnus throw error 
        if (!allAlumnus) {
            throw Error('Resource could not be located !!')
        }

        // return status and data as json
        return res.status(201).json(allAlumnus)

    } catch (error) {
        // return status and error as json
        return res.status(403).json({ message: error.message })
    }
}

// function to get single Alumni
exports.getAlumniById = async(req, res) => {
    const { id } = req.params

    try {
        // verify if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('Not a valid id')
        }

        // find alumni using db using id
        let alumni = await Alumni.findById(id)

        // if not found throw error
        if (!alumni) {
            throw Error(`Resource could ot be located`)
        }

        // return data and message as json
        res.status(200).json({ message: 'successful', data: alumni })

    } catch (error) {
        // return status and error as json
        return res.status(403).json({ message: error.message })
    }
}


//function to create new alumni account
exports.createAlumni = async(req, res) => {

    // destructuring request body
    let { fullName, emailAddress, password } = req.body

    try {
        // generate verification code
        let verificationCode = await generateRandomNumber()

        // signup user using static function   
        const alumni = await Alumni.signup(fullName, emailAddress, password, verificationCode)

        // create a token
        const token = createToken(alumni._id)
            // getting the current time
        let logTime = new Date();
        let logger = emailAddress;
        let logType = "signup";
        let logerType = "Alumni";
        // tracking the sign up time
        const feedback = await Logs.logging(logger, logTime, logType, logerType);
        console.log(feedback);

        // send welcome email
        let subject = "Welcome On Board";
        let message = `Hi ${fullName}, welcome to Loumni, Centralized Academic Credentials Services System. Your verfication code is: ${verificationCode}`;
        await Alumni.sendEmail(emailAddress, subject, message)

        // return status code and data as json
        return res.status(200).json({ alumni: alumni, token: token })

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
        const foundAlumni = await Alumni.findOne({ emailAddress });

        // check if email exists in database
        if (!foundAlumni) {
            throw Error('Email does not exist in our database')
        }

        // Generate a reset token
        const resetToken = await generateRandomNumber()

        // Set the reset token and expiration time in the foundAlumni document
        foundAlumni.resetPasswordToken = resetToken;
        foundAlumni.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour

        // save resetToken and expiry date in database
        await foundAlumni.save();

        // send password reset email
        await Alumni.sendEmail(emailAddress, 'Reset password', `Password reset link: https://loumni.net/alumni/reset-password/${resetToken}`)

        // debug here for errors
        return res.status(200).json({ message: `Verification email successfully sent`, alumni: foundAlumni })

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
        const foundAlumni = await Alumni.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        // if alumni not found throw error
        if (!foundAlumni) {
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

        // Update the foundAlumni's password
        foundAlumni.password = hash;
        foundAlumni.resetPasswordToken = '';
        foundAlumni.resetPasswordExpires = '';

        await foundAlumni.save();


        return res.status(200).json({ message: "Password reset successful", alumni: foundAlumni });

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}


// change password
exports.changePassword = async(req, res) => {
    try {
        const _Id = req.params.alumniId;
        const { newPassword, confirmNewPassword } = req.body;

        // find alumni using Id
        const foundAlumni = await Alumni.findById(_Id);

        // if alumni not found throw error
        if (!foundAlumni) {
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
        foundAlumni.password = hash;
        await foundAlumni.save();
        // send message to user email
        const emailAddress = foundAlumni.emailAddress,
            subject = "Password changed",
            message = `This is to notifies you that your password has been successfully change to: ${newPassword}. If this changes were made from unauthorized user, kindly contact our support immediately.`;
        await Alumni.sendEmail(emailAddress, subject, message)
        return res.status(200).json({ message: "Password updated successfully", alumni: foundAlumni });

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}


// verify a recently registered user
exports.verifyAlumnus = async(req, res) => {
    // get alumnusId and verificationCode from user parameters

    const { verificationCode, id } = req.body

    try {
        // verify if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('Not a valid id')
        }

        // find alumnus in database
        const foundAlumni = await Alumni.findById(id)

        // if user not found in database throw error
        if (!foundAlumni) {
            throw Error("This user doesn't exist in our database")
        }

        // not match throw error
        if (verificationCode != foundAlumni.verfificationCode) {
            throw Error('Incorrect verfication code')
        }

        // compare params code with found users verification code
        if (verificationCode === foundAlumni.verfificationCode) {
            let verifiedAlumni = await Alumni.findByIdAndUpdate(id, { isVerified: true }, { new: true, useFindAndModify: false })
            const emailAddress = foundAlumni.emailAddress,
                subject = "Verification Status",
                message = "congratulation, your email verification was successfulled."
            await Alumni.sendEmail(emailAddress, subject, message)
            return res.status(200).json({ message: 'Successfully updated', alumni: verifiedAlumni })

        }

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}

// login Alumni
exports.loginAlumnus = async(req, res) => {
    const { emailAddress, password } = req.body

    try {
        // login alumni
        const alumni = await Alumni.login(emailAddress, password)

        if (!alumni) {
            throw Error('Login unsucessful')
        }
        // generate verification code
        let verificationCode = generateRandomNumber()
            // update verification code
        let id = alumni._id
        await Alumni.findByIdAndUpdate(id, { verificationCode: verificationCode }, { new: true, useFindAndModify: false });
        // create a token
        // getting the current time
        let logTime = new Date();
        let logger = emailAddress;
        let logType = "signin"
        let logerType = "Alumni"
            // tracking the sign up time
        const feedback = await Logs.logging(logger, logTime, logType, logerType);
        console.log(feedback);
        // Send login notification to user email
        let t = new Date();
        const subject = "Login Notification",
            message = `Hi Alumni, your login authentication code to your Loumni integrity system account is: ${verificationCode}. If this login attemt was not from you, kindly contact our support team immediately. This activity happend on: ${t}`
        await Alumni.sendEmail(emailAddress, subject, message)
        return res.status(200).json({ alumni, message: "Login authentication code has been sent to your email." })

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}

// verify a recently login atempt by alumni user
exports.verifyLoginAlumni = async(req, res) => {
    // get alumnusId and verificationCode from user parameters

    const { verificationCode, id } = req.body

    try {
        // verify if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('Not a valid id')
        }

        // find alumnus in database
        const alumni = await Alumni.findById(id)

        // if user not found in database throw error
        if (!alumni) {
            throw Error("This user doesn't exist in our database")
        }

        // not match throw error
        if (verificationCode != alumni.verfificationCode) {
            throw Error('Incorrect verfication code')
        }

        // compare params code with found users verification code
        if (verificationCode === alumni.verfificationCode) {
            const token = createToken(alumni._id);
            return res.status(200).json({ alumni, token })

        }

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}


// update alumni information
exports.updateAlumni = async(req, res) => {
    const { id } = req.params
    const {
        fullName,
        phoneNumber,
        emailAddress
    } = req.body
    let txt = 'Hello ' + fullName + ', congratulation your account with Loumni integrety system has been successfuly updated.';
    try {

        // verify if id is of mongoose type
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('Not a valid id')
        }
        // find alumnus in database the id and update
        let updatedDetails = await Alumni.update(id, {
            fullName,
            phoneNumber,
            emailAddress,
        });
        // send congratulatory message to the alumni phone number
        await sendSMS(txt, phoneNumber);
        subject = "Account Updated Successfully",
            message = "Congratulation, your has been updated successfully."
        await Alumni.sendEmail(emailAddress, subject, message)
            // return succesful status code, message and the updated user
        return res.status(200).json({ message: "Alumni updated!", Alumni: updatedDetails })

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}

// delete Alumni
exports.deleteAlumni = async(req, res) => {
    const { id } = req.params

    try {
        // verify if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('Not a valid id')
        }

        // search alumni db and delete item with the id
        let deletedAlumni = await Alumni.findByIdAndDelete(id)

        if (!deletedAlumni) {
            throw Error('This resource could not be deleted, it seems it does not exist in our database')
        }

        return res.status(200).json({ message: 'Successfully deleted', data: deletedAlumni })

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}


// fetch transcript payment details
exports.getTranscriptPaymentDetails = async(req, res) => {

    try {
        const reference = req.params.transcriptId;
        // get all info from parameters
        const { emailAddress } = req.body;
        const foundAlumni = await Alumni.findOne({ _id: reference });

        // check if email exists in database
        if (!foundAlumni) {
            throw Error('Email does not exist in our database')
        }

        // Generate a reset token
        const resetToken = await generateRandomNumber()

        // Set the reset token and expiration time in the foundAlumni document
        foundAlumni.resetPasswordToken = resetToken;
        foundAlumni.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour

        // save resetToken and expiry date in database
        await foundAlumni.save();

        // send password reset email
        await Alumni.sendEmail(emailAddress, 'Reset password', `Password reset link: https://transcript360.onrender.com/alumni/reset-password/${resetToken}`)

        // debug here for errors
        return res.status(200).json({ message: `Verification email successfully sent`, alumni: foundAlumni })

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}

module.exports = exports