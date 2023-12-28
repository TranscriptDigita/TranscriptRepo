// =================================
// ======= libararies required =====
// =================================
const mongoose = require('mongoose');


// =================================
// ==== creating Admin schema =====
// =================================
const notificationsSchema = new mongoose.Schema({
    message: { type: String, required: true },
    receivers: { type: String }

}, { timestamps: true })

// ==================================
// ==== static functions for Auth ===
// ==================================

//Function to tracking user signUp and signIn time
logsSchema.statics.sendNotifications = async function(message, receivers) {
    // creating new log in database
    const log = await this.create({ message, receivers })

    // console log the feedback
    console.log(log);
}




// ==================================
// ==== modeling logs with schema ==
// ==================================
const Notifications = mongoose.model('notifications', notificationsSchema)

// ==================================
// ======== exports =================
// ==================================
module.exports = Notifications;