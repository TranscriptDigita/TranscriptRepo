// =================================
// ======= libararies required =====
// =================================
const mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    validator = require('validator'),
<<<<<<< HEAD
    nodemailer = require('nodemailer') ,
    smtpTransport = require('nodemailer-smtp-transport')
=======
    nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport')
const { Schema } = mongoose;
>>>>>>> origin/godwin

// =======================================
// ====== Institution Schema =============
// =======================================

const institutionSchema = new mongoose.Schema({
<<<<<<< HEAD
    name:               {type: String, required: true, unique: true},
    emailAddress:       {type: String, required: true, unique: true},
    password:           {type: String, required: true},
    location:           {type: String, required: true},
    transcriptTypes:    [],
    staff:              [],
    verificationCode:  {type: String},
    isActive:           {type: Boolean, default: true},
    isVerified:         {type: Boolean, default: false}

}, {timestamps: true})
=======
    name: { type: String, required: true, unique: true },
    emailAddress: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String, required: true },
    transcriptTypes: [],
    staff: [{ type: Schema.Types.ObjectId, ref: 'Staff' }],
    verificationCode: { type: String },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false }

}, { timestamps: true })
>>>>>>> origin/godwin


// =============================================
// ======= statics functions ===================
// =============================================

<<<<<<< HEAD
institutionSchema.statics.signup = async function (name, emailAddress, location, password, verificationCode) {
    // check if all inputs are filled
    if(!name || !emailAddress || !location || !password){
=======
institutionSchema.statics.signup = async function(name, emailAddress, location, password, verificationCode) {
    // check if all inputs are filled
    if (!name || !emailAddress || !location || !password) {
>>>>>>> origin/godwin
        throw Error('All fields are required !')
    }

    // use validator to validate email
<<<<<<< HEAD
    if(!validator.isEmail(emailAddress)){
=======
    if (!validator.isEmail(emailAddress)) {
>>>>>>> origin/godwin
        throw Error('email is not valid')
    }

    // use validator check if password is strong enough
<<<<<<< HEAD
    if(!validator.isStrongPassword(password)){
=======
    if (!validator.isStrongPassword(password)) {
>>>>>>> origin/godwin
        throw Error('password is not strong enough')
    }

    // check if email exists in database
<<<<<<< HEAD
    const exists = await this.findOne({emailAddress}) 

    // throw error if email already exists
    if(exists){
=======
    const exists = await this.findOne({ emailAddress })

    // throw error if email already exists
    if (exists) {
>>>>>>> origin/godwin
        throw Error('email already in use !')
    }

    // check if name exists in database
<<<<<<< HEAD
    const nameExists = await this.findOne({name})

    // throw error if name already exists
    if(nameExists){
=======
    const nameExists = await this.findOne({ name })

    // throw error if name already exists
    if (nameExists) {
>>>>>>> origin/godwin
        throw Error('name already exists in our database')
    }

    // generating salt to hash password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // saving instition in database
<<<<<<< HEAD
    const institution = await this.create({name, emailAddress, location, password: hash, verificationCode})
=======
    const institution = await this.create({ name, emailAddress, location, password: hash, verificationCode })
>>>>>>> origin/godwin

    // returning saved institution as json
    return institution
}

// sending email to staff
<<<<<<< HEAD
institutionSchema.statics.sendEmail = async function (email, subject, message) {
=======
institutionSchema.statics.sendEmail = async function(email, subject, message) {
>>>>>>> origin/godwin
    let transport = nodemailer.createTransport(smtpTransport({
        host: 'smtp.gmail.com',
        secure: true,
        port: 465,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    }))

    const info = await transport.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: subject,
        text: message
<<<<<<< HEAD
    }, (err, sent)=>{
        err ? console.log('error send email') : console.log('succesfully sent', sent)     
=======
    }, (err, sent) => {
        err ? console.log('error send email') : console.log('succesfully sent', sent)
>>>>>>> origin/godwin
    })
}

// function to login admin
<<<<<<< HEAD
institutionSchema.statics.login = async function (emailAddress, password) {

    // validation
    if(!emailAddress || !password){
       throw Error('All fields must be filled')
   }

    // find an email in database   
   const institution = await this.findOne({emailAddress})

    // not exist throw error   
   if(!institution){
       throw Error('Incorrect email')
   }

   // if account inactive throw error    
   if(!institution.isVerified){
=======
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
>>>>>>> origin/godwin
        throw Error('sorry your account is disabled')
    }

    // if account inactive throw error    
<<<<<<< HEAD
   if(!institution.isActive){
        throw Error('sorry your account is disabled')
   }

   const match = await bcrypt.compare(password, institution.password)

   if(!match){
       throw Error('Incorrect password')
   }

   return institution
=======
    if (!institution.isActive) {
        throw Error('sorry your account is disabled')
    }

    const match = await bcrypt.compare(password, institution.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return institution
>>>>>>> origin/godwin

}



// ======= modeling schema =====================
const Institution = mongoose.model('institution', institutionSchema)

<<<<<<< HEAD
module.exports = Institution
=======
module.exports = Institution
>>>>>>> origin/godwin
