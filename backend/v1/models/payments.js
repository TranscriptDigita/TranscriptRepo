// =================================
// ======= libararies required =====
// =================================
const mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    validator = require('validator'),
    nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport')


// =================================
// ==== creating Alumni schema =====
// =================================
const paymentsSchema = new mongoose.Schema({
    institutionId: { type: String, required: true },
    institutionName: { type: String, required: true },
    alumniName: { type: String, required: true },
    reference: { type: String, required: true },
    paymentStatus: { type: String, required: true },
    amount: { type: Number, required: true },
    paidAt: { type: String, required: true },
    paymentChennel: { type: String, required: true },
    currency: { type: String, required: true },
    paymentAccountName: { type: String, required: true },
    bank: { type: String, required: true },

}, { timestamps: true })

// ==================================
// ==== static functions for Auth ===
// ==================================

// create payements function
paymentsSchema.statics.createPayment = async function(institutionId, institutionName, alumniName, reference, paymentStatus, amount, paidAt, paymentChennel, currency, paymentAccountName, bank) {

    // check if all inputs are filled
    if (!institutionId || !institutionName || !alumniName || !reference || !paymentStatus || !amount || !paidAt || !paymentChennel || !currency || !paymentAccountName || !bank) {
        throw Error('all fields are required')
    }

    // creating new payment details in database
    const payData = await this.create({ institutionId, institutionName, alumniName, reference, paymentStatus, amount, paidAt, paymentChennel, currency, paymentAccountName, bank })

    // returning the saved data
    console.log(payData)
}

// Fetch payment by Id
paymentsSchema.statics.getByReferenceNumber = async function(referenceId) {
    // validation
    if (!referenceId) {
        throw Error('Reference Id is required!')
    }

    // find an referenceId in database   
    const d = await this.findOne({ reference: referenceId })

    // not exist throw error   
    if (!d) {
        throw Error('No resource found with this referenceId')
    }

    return d;
}

// Fetch all payments by institutionId
paymentsSchema.statics.getAllPaymentsByInstitutionId = async function(institutionId) {
    // validation
    if (!institutionId) {
        throw Error('Reference Id is required!')
    }

    // find an referenceId in database   
    const d = await this.find({ institutionId: institutionId })

    // not exist throw error   
    if (!d) {
        throw Error('No payment record found!')
    }

    return d;
}


// ==================================
// ==== modeling alumni with schema==
// ==================================
const Payments = mongoose.model('payments', paymentsSchema)

// ==================================
// ======== exports =================
// ==================================
module.exports = Payments;