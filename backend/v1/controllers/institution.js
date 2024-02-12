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
        const txt = `Hi ${name}, welcome to Centralized Academic Credentials Services. Your verfication code is: ${verificationCode}`
        await sendSMS(txt, phoneNumber);
        // generate token
        const token = await createToken(institution._id)

        // send welcome email
        await Institution.sendEmail(emailAddress, `Hi ${name}, welcome to Centralized Academic Credentials Services. Your verfication code is: ${verificationCode}`)

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
        // create a token
        const token = createToken(institution._id)
            // getting the current time
        let logTime = new Date();
        let logger = emailAddress;
        let logType = "signin";
        let logerType = "Institution";
        // tracking the sign up time
        const feedback = await Logs.logging(logger, logTime, logType, logerType);
        console.log(feedback);

        return res.status(200).json({ institution, token })

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
            throw Error('not a valid id')
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
            return res.status(200).json({ message: 'successfully updated', institution: verifiedInstitution })
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
            return res.status(200).json({ message: 'Account details successfully setup.', institution: bankDetails })


        } catch (error) {
            // return error code and message 
            return res.status(500).json({ message: error.message })
        }
    }
    // function to get all Alumnus
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
        const cerP = await institutionDocs[0].amountForCertificate;
        if (cerP != null) {
            certPrice = institutionDocs[0].amountForCertificate;
            officialPrice = institutionDocs[0].amountForPhysicalMode;
            personalPice = institutionDocs[0].amountForElectronicalMode;
            resultPrice = institutionDocs[0].amountForStatementOfResult;
            // return status and data as json
        } else {
            throw Error('Documents Amounts are yet to be setup by the institution.')
        }
        let data = [{ document: "Certificate", amount: certPrice }, { document: "Official Transcript", amount: officialPrice }, { document: "Personal Transcrpt", amount: personalPice }, { document: "Statement of Result", amount: resultPrice }]
        return res.status(200).json(data)

    } catch (error) {
        // return status and error as json
        return res.status(403).json({ message: error.message })
    }
}



module.exports = exports