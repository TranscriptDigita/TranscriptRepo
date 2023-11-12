const mongoose = require('mongoose')
    // new mongoose.Schema
const resultSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    cgp: { type: String, required: true },
    grade: { type: String, required: true },
    institutionId: { type: String, required: true },
})

module.exports = mongoose.model('result', resultSchema)

// ==================================
// ==== modeling result with schema==
// ==================================
// const Result = mongoose.model('alumni', alumniSchema)

// ==================================
// ======== exports =================
// ==================================
// module.exports = Result