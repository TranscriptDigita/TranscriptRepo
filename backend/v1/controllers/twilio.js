const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// client.messages
//     .create({
//         body: 'You have an appointment with Owl, Inc. on Friday, November 3 at 4:00 PM. Reply C to confirm.',
//         messagingServiceSid: 'MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
//         to: '+15558675310'
//     })
//     .then(message => console.log(message.sid))


const sms = function messaging(txt, to) {
    client.messages
        .create({
            body: txt,
            from: '+17622499952',
            to: to
        })
        .then(message => console.log(message.sid));
}

module.exports = sms;