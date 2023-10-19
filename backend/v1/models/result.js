const mongoose = require('mongoose')
const resultSchema = mongoose.schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    standard: { type: String, required: true }
})

module.exports = mongoose.model('result', resultSchema)

// ==================================
// ==== modeling result with schema==
// ==================================
const Result = mongoose.model('alumni', alumniSchema)

// ==================================
// ======== exports =================
// ==================================
module.exports = Result