// =============================
// ======== libraries required =
// =============================
require('dotenv').config()
const Institution = require('../models/institution'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    validator = require('validator'),
    nodemailer = require('nodemailer');

// =============================
// === funtion to create token==
// ============================= 
const sendEmail = async function(email, subject, message) {
    let transport = nodemailer.createTransport({
        service: 'gmail',
        host: process.env.EMAIL_HOST,
        secure: false, // 465,
        port: 587,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const info = await transport.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: subject,
        html: message

    }, (err, sent) => {
        err ? res.status(505).json({ message: 'Error ocuured while sending your message.', err }) : res.status(200).json({ message: 'Successully sent', sent })

    })
}


// ===========================================
// ==== function that generates random nums ==
// ===========================================
//function to set up bank account details
exports.setupBankAccount = async(req, res, next) => {
    try {
        const { bankName, bankSortCode, accountName, accountNumber } = req.body;
        const id = req.user._id
        if (!bankName || !bankSortCode || !accountName || !accountNumber) {
            return res.status(403).json({ message: "All fields are required!" });
        }
        // verify if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(409).json({ message: "Not a valid id!" })
                // throw Error('Not a valid id')
        }
        const bankAccountUpdated = await Institution.findByIdAndUpdate(id, { bankName, bankSortCode, accountNumber, accountName })

        // If record found
        if (!bankAccountUpdated) {
            //    return status code with message
            return res.status(404).json({ message: "Incorrect institution ID passed!" })
        }
        // sending the contact us message
        const email = bankAccountUpdated.emailAddress,
            subject = 'Submission Of Bank Account',
            message = `Hello ${accountName}, your account details has been submitted to Loumni system as your official school bank account. If you did not authorized this process kindly contact our support team immediately.`;
        await sendEmail(email, subject, message)
            // return succesful status code, message and the new creaed transcript
        return res.status(200).json({
            message: 'Bank account set and updated successfully.',
            bankAccountUpdated
        })

    } catch (error) {
        // return error code and message 
        return res.status(500).json({ message: error.message })
    }
}



module.exports = exports