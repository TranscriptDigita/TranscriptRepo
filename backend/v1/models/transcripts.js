// imports
const mongoose = require('mongoose')


// transcript schema
const transcriptSchema = new mongoose.Schema({

    referenceId: { type: String, required: true, unique: true },
    typeOfDocument: { type: String },
    degreeType: { type: String, required: true },
    institutionId: { type: String, required: true },
    institutionName: { type: String, required: true },
    faculty: { type: String, required: true },
    department: { type: String, required: true },
    matricNumber: { type: String, required: true },
    yearOfGraduation: { type: Date, required: true },
    program: { type: String, required: true },
    modeOfDelivery: { type: String, default: null },
    recipientCountry: { type: String, default: null },
    recipientEmail: { type: String, default: null },
    recipientAddress: { type: String, default: null },
    recipientPhoneNumber: { type: Number, default: null },
    typeOfTranscript: { type: String, default: null },
    preferCourier: { type: String, default: "None" },
    courierContactPhoneNumber: { type: String, default: null },
    courierHeadOfficeAddress: { type: String, default: null },
    isSubmitted: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    isPaid: { type: Boolean, default: false },
    paymentStatus: { type: String, default: "None" },
    amountPaid: { type: Number, default: 0 },
    isApproved: { type: Boolean, default: false },
    isQuerried: { type: Boolean, default: false },
    isDeclined: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true },
    verfiedBy: { type: mongoose.Schema.Types.ObjectId },
    approvedBy: { type: mongoose.Schema.Types.ObjectId },
    querriedBy: { type: mongoose.Schema.Types.ObjectId },
    declinedBy: { type: mongoose.Schema.Types.ObjectId },


}, { timestamps: true })

// Create new transcript
transcriptSchema.statics.createNewTranscript = async function(referenceId, typeOfDocument, degreeType, institutionId, institutionName, faculty, department, matricNumber, yearOfGraduation, program, createdBy) {

    // check if all required data are filled
    if (!referenceId || !typeOfDocument || !degreeType || !institutionId || !institutionName || !faculty || !department || !matricNumber || !yearOfGraduation || !program || !createdBy) {
        throw Error('All fields are required')
    }

    // creating new transcript in database
    const newTranscript = await this.create({ referenceId, typeOfDocument, degreeType, institutionId, institutionName, faculty, department, matricNumber, yearOfGraduation, program, createdBy })

    // returning the new created transcript
    return newTranscript
}

// modelling transcript schema
const Transcripts = mongoose.model('transcript', transcriptSchema)

// exporting transcript
module.exports = Transcripts