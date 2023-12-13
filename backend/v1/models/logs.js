// =================================
// ======= libararies required =====
// =================================
const mongoose = require('mongoose');


// =================================
// ==== creating Admin schema =====
// =================================
const logsSchema = new mongoose.Schema({
    logger: { type: String, required: true },
    logTime: { type: Date },
    logType: { type: String }


}, { timestamps: true })

// ==================================
// ==== static functions for Auth ===
// ==================================

//Function to tracking user signUp and signIn time
logsSchema.statics.logging = async function(logger, logTime, logType) {
    // creating new log in database
    const log = await this.create({ logger, logTime, logType })

    // console log the feedback
    console.log(log);
}




// ==================================
// ==== modeling logs with schema ==
// ==================================
const Logs = mongoose.model('logs', logsSchema)

// ==================================
// ======== exports =================
// ==================================
module.exports = Logs;