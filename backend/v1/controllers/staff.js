// =============================
// ======== libraries required =
// =============================
require('dotenv').config()
const Staff = require('../models/staff'),
    Institution = require('../models/institution'),
    Logs = require('../models/logs'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    validator = require('validator'),
    bcrypt = require('bcryptjs')

// const htmlContent = fs.readFileSync('./views/welcomeEmail.html', 'utf-8')

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
            // send message to the staff email
        const subject = 'Task Assigned',
            message = `Hello, this is to notify you that your institution have assigned you to work as: ${role} in loumni system. Your login details are: Email=> ${emailAddress}, password=> ${password} . Kindly visit www.loumni.net and sign as a staff to do your assigned works.`;
        await Institution.sendEmail(emailAddress, subject, message)
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
        // const token = createToken(staff._id);
        // generate verification code
        let verificationCode = await generateRandomNumber()
            // update verification code
        let id = staff._id
        await Staff.findByIdAndUpdate(id, { verificationCode: verificationCode }, { new: true, useFindAndModify: false });

        // getting the current time
        let logTime = new Date();
        let logger = emailAddress;
        let logType = "signin";
        let logerType = "Staff";
        // tracking the sign up time
        const feedback = await Logs.logging(logger, logTime, logType, logerType);
        // send message to the staff email
        const t = new Date();
        const subject = 'Login Notification',
            message = `Hello, your login authentication to your loumni integrity system staff account is: ${verificationCode} . This was generated on ${t}. Kindly contact our support immediately if you did not authorized this login attempt..`;
        await Institution.sendEmail(emailAddress, subject, message)
        return res.status(200).json({ staff, message: "Login authentication code has been sent to your email." });

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message });
    }
}


// verify a recently login atempt by alumni user
exports.verifyLoginStaff = async(req, res) => {
    try {
        // get alumniId and verificationCode from user parameters
        const { verificationCode, id } = req.body
            // verify if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('Not a valid id')
        }

        // find alumnus in database
        const staff = await Staff.findById(id)

        // if user not found in database throw error
        if (!staff) {
            throw Error("This user doesn't exist in our database")
        }

        // not match throw error
        if (verificationCode != staff.verificationCode) {
            throw Error('Incorrect verfication code')
        }

        // compare params code with found users verification code
        if (verificationCode === staff.verificationCode) {
            const token = createToken(staff._id);
            return res.status(200).json({ staff, token })

        }

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
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
        // send message to the staff email
        const emailAddress = foundStaff.emailAddress,
            subject = 'Password Changed',
            message = `Your password to loumni account has been successfully changed to: ${newPassword}`;
        await Institution.sendEmail(emailAddress, subject, message)

        return res.status(200).json({ message: "Password successfully changed", staff: foundStaff });

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}

// Truesury Staff set transcript processing amount
exports.setAmount = async(req, res) => {
    try {
        // get staffId from user parameters
        const { institutionId } = req.params
        const { typeOfDocument, amount, documentsToUpload } = req.body;
        // find staff using token and expiry time
        const foundInstitution = await Institution.findOne({ _id: institutionId });

        // if staff not found throw error
        if (!foundInstitution) {
            throw Error("Incorrect institution id");
        }
        // Set amount amountForPhysicalMode
        if (!typeOfDocument || !amount || !documentsToUpload) {
            throw Error("All fields are required!");
        }
        if (typeOfDocument == "Official Transcript" || typeOfDocument === "Officail Transcript") {
            foundInstitution.amountForPhysicalMode = amount;
            foundInstitution.TranscriptDocumentsToUpload = documentsToUpload;

            await foundInstitution.save();
            return res.status(200).json({ message: 'Official Transcript processing amount set successfully.', data: { typeOfDocument, amount } });
        } else if (typeOfDocument == "Personal Transcript" || typeOfDocument === "Personal Transcript") {
            foundInstitution.amountForElectronicalMode = amount;
            foundInstitution.TranscriptDocumentsToUpload = documentsToUpload;
            await foundInstitution.save();
            return res.status(200).json({ message: 'Personal Transcript processing amount set successfully.', data: { typeOfDocument, amount } });
        } else if (typeOfDocument == "Certificate" || typeOfDocument === "Certificate") {
            foundInstitution.amountForCertificate = amount;
            foundInstitution.CertificateDocumentsToUpload = documentsToUpload;
            await foundInstitution.save();
            return res.status(200).json({ message: 'Certificte processing amount set successfully.', data: { typeOfDocument, amount } });
        } else if (typeOfDocument == "Statement of Result" || typeOfDocument === "Statement of Result") {
            foundInstitution.amountForStatementOfResult = amount;
            foundInstitution.StatementOfResultDocumentsToUpload = documentsToUpload;
            await foundInstitution.save();
            return res.status(200).json({ message: 'Statement of Result processing amount set successfully.', data: { typeOfDocument, amount } });
        }
    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}




module.exports = exports