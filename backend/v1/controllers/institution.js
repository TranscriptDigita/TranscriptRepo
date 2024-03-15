// =============================
// ======== libraries required =
// =============================
require('dotenv').config()
const Institution = require('../models/institution'),
    Logs = require('../models/logs'),
    // bankDetails = require('bankAccount'),
    sendSMS = require('./twilio'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    validator = require('validator')

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

// function to get all Alumnus
exports.getAllInstitutions = async(req, res) => {
    try {

        // find all alumni in database
        let allInstitutions = await Institution.find({})

        // if not allAlumnus throw error 
        if (!allInstitutions) {
            throw Error('resource could not be located !!')
        }

        // return status and data as json
        return res.status(200).json(allInstitutions)

    } catch (error) {
        // return status and error as json
        return res.status(403).json({ message: error.message })
    }
}


exports.registerInstitution = async(req, res) => {

    try {
        // destructure requestbody
        const { name, emailAddress, location, password, phoneNumber } = req.body

        // generate verification code
        const verificationCode = await generateRandomNumber()

        // signup user using statics func
        const institution = await Institution.signup(name, emailAddress, location, password, phoneNumber, verificationCode)
            // getting the current time
        let logTime = new Date();
        let logger = name;
        let logType = "signup";
        let logerType = "Institution";
        // tracking the sign up time
        const feedback = await Logs.logging(logger, logTime, logType, logerType);
        console.log(feedback);
        const txt = `Hi ${name}, welcome to Loumni System - A Centralized Academic Credentials Services. Your verfication code is: ${verificationCode}`
            // await sendSMS(txt, phoneNumber);
            // generate token
        const token = await createToken(institution._id)

        // send welcome email
        let subject = "Welcome On Board";
        let message = `Hi ${name}, welcome to Loumni System - A Centralized Academic Credentials Services System. Your verfication code is: ${verificationCode}`;
        await Institution.sendEmail(emailAddress, subject, message);

        // return user as json
        return res.status(200).json({ institution, token })

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }

}

// login institution
exports.loginInstitution = async(req, res) => {
    const { emailAddress, password } = req.body

    try {
        console.log(emailAddress)
            // login institution
        const institution = await Institution.login(emailAddress, password)

        if (!institution) {
            throw Error('Login unsucessful')
        }

        // generate login authentication code
        const verificationCode = await generateRandomNumber()
        let id = await institution._id;
        let verifiedInstitution = await Institution.findByIdAndUpdate(id, { verificationCode: verificationCode }, { new: true, useFindAndModify: false })
            // send login notification message
        const subject = "Login Notification",
            message = `Your login authentication code is: ${verificationCode}  Loumni account. Please contact our support team immediately if you think is an unauthorized login attempt.`
        await Institution.sendEmail(emailAddress, subject, message);
        // create a token
        // const token = createToken(institution._id)
        // getting the current time
        let logTime = new Date();
        let logger = emailAddress;
        let logType = "signin";
        let logerType = "Institution";
        // tracking the sign up time
        const feedback = await Logs.logging(logger, logTime, logType, logerType);
        console.log(feedback);

        return res.status(200).json({ institution, message: "Login Authentication code has been sent to your email." })

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}


// verify a recently registered user
exports.verifyInstitution = async(req, res) => {
    // get institutionId and verificationCode from user parameters

    const { verificationCode, id } = req.body

    try {
        // verify if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('Not a valid id')
        }

        // find alumnus in database
        const foundInstitution = await Institution.findById(id)

        // if user not found in database throw error
        if (!foundInstitution) {
            throw Error('This user doesnt exist in our database')
        }

        // not match throw error
        if (verificationCode != foundInstitution.verificationCode) {
            throw Error('Incorrect verfication code')
        }

        // compare params code with found users verification code
        if (verificationCode === foundInstitution.verificationCode) {
            let verifiedInstitution = await Institution.findByIdAndUpdate(id, { isVerified: true }, { new: true, useFindAndModify: false })
                // send login notification message
            const subject = "Verification Status",
                emailAddress = verifiedInstitution.emailAddress,
                message = "Your account verification was successfulled! You can now proceed and login"
            await Institution.sendEmail(emailAddress, subject, message);
            return res.status(200).json({ message: 'Successfully updated', institution: verifiedInstitution })
        }

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}

// verify a recently login atempt by institution
exports.verifyLoginInstitution = async(req, res) => {
    // get institutionId and verificationCode from user parameters

    const { verificationCode, id } = req.body

    try {
        // verify if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('Not a valid id')
        }

        // find alumnus in database
        const institution = await Institution.findById(id)

        // if user not found in database throw error
        if (!institution) {
            throw Error('This user doesnt exist in our database')
        }
        // confirm package renewal date
        const curDate = new Date();
        let curDay = curDate.getDate();
        let packageRenewDued = curDate.setDate(curDay);
        let packageRenewDate = await institution.packageRenewDate;
        var isActivePackage = false
        if (packageRenewDued > packageRenewDate) {
            isActivePackage = false
        }
        // not match throw error
        if (verificationCode != institution.verificationCode) {

            throw Error('Incorrect verfication code')
        }

        // compare params code with found users verification code
        if (verificationCode === institution.verificationCode) {
            const token = createToken(institution._id)
            return res.status(200).json({ institution, token, isActivePackage })
        }

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}


// set up bank account details
exports.setupBankAccountDetails = async(req, res) => {
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
        // find alumnus in database
        const foundInstitution = await Institution.findById(id)

        // if user not found in database throw error
        if (!foundInstitution) {
            return res.status(404).json({ message: "Incorrect id passed!" });
            // throw Error('This user doesnt exist in our database')
        }
        let bankDetails = await Institution.findByIdAndUpdate(id, { accountNumber, accountName, bankName, bankSortCode })
            // sending the contact us message
        const email = bankDetails.emailAddress,
            instName = bankDetails.name,
            subject = 'Submission Of Bank Account',
            message = `Hello ${instName}, your account details has been submitted to Loumni system as your official school bank account. If you did not authorized this process kindly contact our support team immediately.`;
        await sendEmail(email, subject, message)
        return res.status(200).json({ message: 'Account details successfully setup.', institution: bankDetails })


    } catch (error) {
        // return error code and message 
        return res.status(500).json({ message: error.message })
    }
}

// function to get all docs prices
exports.getAllInstitutionDocumentPrices = async(req, res) => {
    try {
        const _id = req.params.institutionId
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            throw Error('Not a valid id')
        }
        // find all alumni in database
        let institutionDocs = await Institution.find({ _id: _id })

        // if not allAlumnus throw error 
        if (!institutionDocs) {
            throw Error('Resource could not be located !!')
        }
        var certPrice, officialPrice, personalPice, resultPrice;
        const cerP = await institutionDocs[0].amountForCertificate,
            StatementOfResultDocumentsToUpload = institutionDocs[0].StatementOfResultDocumentsToUpload,
            CertificateDocumentsToUpload = institutionDocs[0].CertificateDocumentsToUpload,
            TranscriptDocumentsToUpload = institutionDocs[0].TranscriptDocumentsToUpload;
        if (cerP != null) {
            certPrice = institutionDocs[0].amountForCertificate;
            officialPrice = institutionDocs[0].amountForPhysicalMode;
            personalPice = institutionDocs[0].amountForElectronicalMode;
            resultPrice = institutionDocs[0].amountForStatementOfResult;
            // return status and data as json
        } else {
            throw Error('Documents Amounts are yet to be setup by the institution.')
        }
        let data = [{ document: "Certificate", amount: certPrice, docsToUpload: CertificateDocumentsToUpload }, { document: "Official Transcript", amount: officialPrice, docsToUpload: TranscriptDocumentsToUpload }, { document: "Personal Transcrpt", amount: personalPice, docsToUpload: TranscriptDocumentsToUpload }, { document: "Statement of Result", amount: resultPrice, docsToUpload: StatementOfResultDocumentsToUpload }]
        return res.status(200).json(data)

    } catch (error) {
        // return status and error as json
        return res.status(403).json({ message: error.message })
    }
}



module.exports = exports