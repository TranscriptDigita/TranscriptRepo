// =================================
// ======= libararies required =====
// =================================
const mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    validator = require('validator'),
    nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport')


// =================================
// ==== creating Logistic schema =====
// =================================
const logisticSchema = new mongoose.Schema({
    businessName: { type: String, required: true },
    emailAddress: { type: String, required: true },
    password: { type: String },
    headOfficeAddress: { type: String },
    contactPhoneNumber: { type: String },
    businessRegistrationNumber: { type: String },
    directorName: { type: String },
    directorContactNumber: { type: String },
    directorIdType: { type: String },
    directorIdNumber: { type: String },
    docmnt: { type: String },
    verfificationCode: { type: Number },
    weDoInternationalDelivery: { type: Boolean, default: false },
    localDeliveryPrice: { type: String },
    internationalDeliveryPrice: { type: String },
    accountNumber: { type: String, default: "None" },
    accountName: { type: String, default: "None" },
    bankName: { type: String, default: "None" },
    bankSortCode: { type: String, default: "None" },
    isVerified: { type: Boolean, default: false },
    kycIsSubmitted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isDisabled: { type: Boolean, default: false },
    isRestricted: { type: Boolean, default: false },
    resetPasswordToken: { type: Number },
    resetPasswordExpires: { type: String }

}, { timestamps: true })

// ==================================
// ==== static functions for Auth ===
// ==================================

// signup courier service function
logisticSchema.statics.signup = async function(businessName, emailAddress, password, verfificationCode) {

    // check if all inputs are filled
    if (!emailAddress || !password) {
        throw Error('all fields are required')
    }

    // using validator to validate email
    if (!validator.isEmail(emailAddress)) {
        throw Error('email is not valid')
    }

    // using validator to check if password is strong
    if (!validator.isStrongPassword(password)) {
        throw Error('password not strong enough')
    }

    // checking if email already exists in database
    const exists = await this.findOne({ emailAddress })

    // throwing error if email exists
    if (exists) {
        throw Error('Email already in use')
    }

    // generating salt to hash password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // creating new admin in database
    const logistic = await this.create({ businessName, emailAddress, password: hash, verfificationCode })

    // returning the saved user
    return logistic
}

// login courier service
logisticSchema.statics.login = async function(emailAddress, password) {
    // validation
    if (!emailAddress || !password) {
        throw Error('All fields must be filled')
    }

    // find an email in database   
    const logistic = await this.findOne({ emailAddress })

    // not exist throw error   
    if (!logistic) {
        throw Error('Incorrect email')
    }

    // if account inactive throw error    
    if (!logistic.isVerified) {
        throw Error('Sorry your account is disabled')
    }

    // if account inactive throw error    
    if (!logistic.isActive) {
        throw Error('Sorry your account is disabled')
    }

    // compare password with users password
    const match = await bcrypt.compare(password, logistic.password)

    // throw an error if not match
    if (!match) {
        throw Error('Incorrect password')
    }

    return logistic
}

// send logistic and email function
logisticSchema.statics.sendEmail = async function(email, subject, message) {
    let transport = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: process.env.EMAIL_HOST,
        secure: false, // 465,
        port: 587,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    }))


    const info = await transport.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: subject,
        html: message

    }, (err, sent) => {
        err ? console.log('error send email', err) : console.log('succesfully sent', sent)

    })
}

// update logistic KYC details
logisticSchema.statics.update = async function(id, {
    headOfficeAddress,
    contactPhoneNumber,
    businessRegistrationNumber,
    directorName,
    directorContactNumber,
    directorIdType,
    directorIdNumber,
    kycIsSubmitted
}) {

    // using validator to validate email
    // if (!validator.isEmail(emailAddress)) {
    //     throw Error('email is not valid')
    // }
    // creating new courier in database
    const logistic = await this.findByIdAndUpdate(id, {
        headOfficeAddress,
        contactPhoneNumber,
        businessRegistrationNumber,
        directorName,
        directorContactNumber,
        directorIdType,
        directorIdNumber,
        kycIsSubmitted
    }, { new: true, useFindAndModify: false })

    // returning the updated user
    return logistic
}

// update logistic delivery option details
logisticSchema.statics.deliveryOptions = async function(id, {
    weDoInternationalDelivery,
    localDeliveryPrice,
    internationalDeliveryPrice
}) {
    // creating new admin in database
    const logistic = await this.findByIdAndUpdate(id, {
        weDoInternationalDelivery,
        localDeliveryPrice,
        internationalDeliveryPrice
    }, { new: true, useFindAndModify: false })

    // returning the updated user
    return logistic
}

// get a single courier user
logisticSchema.statics.getLogisticById = async function(id) {
    // fetching the admin details from the database
    const logistic = await this.findOne({ _id: id })

}

// Set up bank account details
logisticSchema.statics.setupBankAccount = async(id, bankName, bankSortCode, accountName, accountNumber) => {
    try {
        if (!bankName || !bankSortCode || !accountName || !accountNumber) {
            return res.status(403).json({ message: "All fields are required!" });
        }
        // verify if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(409).json({ message: "Not a valid id!" })
                // throw Error('Not a valid id')
        }
        const bankAccountUpdated = await this.findByIdAndUpdate(id, { bankName, bankSortCode, accountNumber, accountName })

        // If record found
        if (!bankAccountUpdated) {
            //    return status code with message
            return res.status(404).json({ message: "Incorrect transcript ID passed!" })
        }
        // return succesful status code, message and the new creaed transcript
        return bankAccountUpdated;

    } catch (error) {
        // return error code and message 
        return res.status(500).json({ message: error.message })
    }
}

// ==================================
// ==== modeling admin with schema==
// ==================================
const Logistic = mongoose.model('logistic', logisticSchema)

// ==================================
// ======== exports ================= 
// ==================================
module.exports = Logistic