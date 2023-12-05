// Function to send email
const sendEmail = async function(email, subject, message) {
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
            html: message

        }, (err, sent) => {
            err ? res.status(505).json({ message: 'Error ocuured while sending your message.', err }) : res.status(200).json({ message: 'Successully sent', sent })

        })
    }
    //contact us function
exports.contactUs = async(req, res) => {

        // destructuring request body
        let { name, email, message } = req.body
        let subject = `${name} Contacting`

        try {

            // sending the contact us message
            await sendEmail(email, subject, message)

            // return status code and data as json
            return res.status(200).json({ message: 'Successully sent' })

        } catch (error) {
            // return error code and message 
            return res.status(400).json({ message: error.message })
        }
    }
    // exporting the contactUs module
module.exports = exports