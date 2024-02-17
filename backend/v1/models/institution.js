// =================================
// ======= libararies required =====
// =================================
const mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    validator = require('validator'),
    nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport')
const HTML_TEMPLATE = require("../controllers/email_template.js");
const { Schema } = mongoose;

// =======================================
// ====== Institution Schema =============
// =======================================

const institutionSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    emailAddress: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String, required: true },
    transcriptTypes: [],
    staff: [{ type: Schema.Types.ObjectId, ref: 'Staff' }],
    verificationCode: { type: String },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    phoneNumber: { type: String },
    accountNumber: { type: String },
    accountName: { type: String },
    bankName: { type: String },
    bankSortCode: { type: String },
    amountForElectronicalMode: { type: Number, default: 20000 },
    amountForPhysicalMode: { type: Number, default: 20000 },
    amountForCertificate: { type: Number, default: 20000 },
    amountForStatementOfResult: { type: Number, default: 20000 },
    StatementOfResultDocumentsToUpload: { type: String, default: "Final Year Clearance Certificate" },
    CertificateDocumentsToUpload: { type: String, default: "Statement Result" },
    TranscriptDocumentsToUpload: { type: String, default: "Statement Result" }

}, { timestamps: true })


// =============================================
// ======= statics functions ===================
// =============================================

institutionSchema.statics.signup = async function(name, emailAddress, location, password, phoneNumber, verificationCode) {
    // check if all inputs are filled
    if (!name || !emailAddress || !location || !password || !phoneNumber) {
        throw Error('All fields are required !')
    }

    // use validator to validate email
    if (!validator.isEmail(emailAddress)) {
        throw Error('email is not valid')
    }

    // use validator check if password is strong enough
    if (!validator.isStrongPassword(password)) {
        throw Error('password is not strong enough')
    }

    // check if email exists in database
    const exists = await this.findOne({ emailAddress })

    // throw error if email already exists
    if (exists) {
        throw Error('email already in use !')
    }

    // check if name exists in database
    const nameExists = await this.findOne({ name })

    // throw error if name already exists
    if (nameExists) {
        throw Error('Name already exists in our database')
    }

    // generating salt to hash password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // saving instition in database
    const institution = await this.create({ name, emailAddress, location, password: hash, phoneNumber, verificationCode })

    // returning saved institution as json
    return institution
}


institutionSchema.statics.sendEmail = async function(email, subject, message) {

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
        text: message,
        html: HTML_TEMPLATE(message),
    }, (err, sent) => {
        err ? console.log('error send email', err) : console.log('succesfully sent', sent)
    })
}

// function to login admin
institutionSchema.statics.login = async function(emailAddress, password) {

    // validation
    if (!emailAddress || !password) {
        throw Error('All fields must be filled')
    }

    // find an email in database   
    const institution = await this.findOne({ emailAddress })

    // not exist throw error   
    if (!institution) {
        throw Error('Incorrect email')
    }

    // if account inactive throw error    
    if (!institution.isVerified) {
        throw Error('sorry your account is disabled')
    }

    // if account inactive throw error    
    if (!institution.isActive) {
        throw Error('sorry your account is disabled')
    }

    const match = await bcrypt.compare(password, institution.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return institution

}

// function to create institution api key for developers user
institutionSchema.statics.createAPIKey = async function(institutionId, apiKey) {
    // checking if the institution ID is passed
    if (!institutionId) {
        throw Error('Institution ID is required!')
    }
    // verify if instituion id is of type of mongoose and valid
    if (!mongoose.Types.ObjectId.isValid(institutionId)) {
        throw Error('Not a valid id')
    }
    // check if the insitution exists, then save the api key in database
    const instituion = await this.findByIdAndUpdate(institutionId, { apiKey });
    const api_key = instituion.apiKey

    // returning api_key
    return api_key
}



// ======= modeling schema =====================
const Institution = mongoose.model('institution', institutionSchema)

module.exports = Institution