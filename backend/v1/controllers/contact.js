const nodemailer = require('nodemailer');
// Function to send email
const sendEmail = async function(email, subject, message, em) {
        let transport = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            host: process.env.EMAIL_HOST,
            secure: false, // 465,
            port: 587,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        }))

        const info = await transport.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: em,
            subject: subject,
            html: message + ' ' + email

        }, (err, sent) => {
            err ? res.status(505).json({ message: 'Error ocuured while sending your message.', err }) : res.status(200).json({ message: 'Successully sent', sent })

        })
    }
    //contact us function
exports.contactUs = async(req, res) => {
        const em = "transcriptdigita@gmail.com"
            // destructuring request body
        let { name, email, message } = req.body
        let subject = `${name} Contacting`

        try {

            // sending the contact us message
            await sendEmail(email, subject, message, em)

            // return status code and data as json
            return res.status(200).json({ message: 'Successully sent' })

        } catch (error) {
            // return error code and message 
            return res.status(400).json({ message: error.message })
        }
    }
    // exporting the contactUs module
module.exports = exports