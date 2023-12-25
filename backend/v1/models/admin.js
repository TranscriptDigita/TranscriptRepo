// =================================
// ======= libararies required =====
// =================================
const mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    validator = require('validator'),
    nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport')


// =================================
// ==== creating Admin schema =====
// =================================
const adminSchema = new mongoose.Schema({
    emailAddress: { type: String, required: true },
    password: { type: String },
    verfificationCode: { type: Number },
    isVerified: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
    isDisabled: { type: Boolean, default: false },
    isRestricted: { type: Boolean, default: false },
    resetPasswordToken: { type: Number },
    resetPasswordExpires: { type: String }

}, { timestamps: true })

// ==================================
// ==== static functions for Auth ===
// ==================================

// signup user function
adminSchema.statics.signup = async function(emailAddress, password, verfificationCode) {

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
    const admin = await this.create({ emailAddress, password: hash, verfificationCode })

    // returning the saved user
    return admin
}

// login user
adminSchema.statics.login = async function(emailAddress, password) {
    // validation
    if (!emailAddress || !password) {
        throw Error('All fields must be filled')
    }

    // find an email in database   
    const admin = await this.findOne({ emailAddress })

    // not exist throw error   
    if (!admin) {
        throw Error('Incorrect email')
    }

    // if account inactive throw error    
    if (!admin.isVerified) {
        throw Error('sorry your account is disabled')
    }

    // if account inactive throw error    
    if (!admin.isActive) {
        throw Error('sorry your account is disabled')
    }

    // compare password with users password
    const match = await bcrypt.compare(password, admin.password)

    // throw an error if not match
    if (!match) {
        throw Error('Incorrect password')
    }

    return admin
}

// send Admin and email function
adminSchema.statics.sendEmail = async function(email, subject, message) {
        // let transport = nodemailer.createTransport(smtpTransport({
        //     service: 'gmail',
        //     // host: process.env.EMAIL_HOST,
        //     // secure: true,
        //     // port: 465,
        //     auth: {
        //         user: process.env.EMAIL_USERNAME,
        //         pass: process.env.EMAIL_PASSWORD
        //     }
        // }))
        let transport = nodemailer.createTransport({
            service: 'gmail',
            // host: process.env.EMAIL_HOST,
            // secure: true,
            // port: 465,
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
            err ? console.log('error send email', err) : console.log('succesfully sent', sent)

        })
    }
    // update user/admin details
adminSchema.statics.update = async function(id, { emailAddress }) {

    // using validator to validate email
    if (!validator.isEmail(emailAddress)) {
        throw Error('email is not valid')
    }
    // creating new admin in database
    const admin = await this.findByIdAndUpdate(id, { emailAddress })

    // returning the updated user
    return admin
}


// get a single user
adminSchema.statics.getAdminById = async function(id) {
    // fetching the admin details from the database
    const admin = await this.findOne({ _id: id })

}

// ==================================
// ==== modeling admin with schema==
// ==================================
const Admin = mongoose.model('admin', adminSchema)

// ==================================
// ======== exports =================
// ==================================
module.exports = Admin