const accountSid = "ACd4ad6ceef070f74beb9b8131552c9c9d" || process.env.TWILIO_ACCOUNT_SID;
const authToken = "8ea6d0eec018433f09f49c204a5dc146" || process.env.TWILIO_AUTH_TOKEN;
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