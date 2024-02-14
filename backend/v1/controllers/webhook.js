// imports
const Transcripts = require('../models/transcripts'),
    Payments = require('../models/payments'),
    Alumni = require('../models/alumni');
const crypto = require('crypto');
const secret = process.env.SECRET_KEY;
// webhook controller
const webhook = async(req, res) => {
    //validate event
    const event = req.body;
    if (event.data.status == "success") {
        const reference = event.data.reference,
            paymentStatus = event.data.status,
            amount = event.data.amount / 100,
            paid_at = event.data.paid_at,
            created_at = event.data.created_at,
            channel = event.data.channel,
            currency = event.data.currency,
            payeeAcctName = event.data.authorization.account_name,
            card_type = event.data.authorization.card_type,
            bank = event.data.authorization.bank,
            alumniEmail = event.data.customer.email
        let paymentData = {
            reference: reference,
            paymentStatus: paymentStatus,
            amount: amount,
            createdAt: created_at,
            paidAt: paid_at,
            paymentChennel: channel,
            currency: currency,
            paymentAccountName: payeeAcctName,
            cardType: card_type,
            bank: bank,
        }
        try {
            const findTranscript = await Transcripts.findByIdAndUpdate(reference, { isPaid: true, paymentStatus: paymentStatus, amountPaid: amount })
                // If record found
            if (!findTranscript) {
                throw Error("Something went wrong!");
            }
            await Alumni.updateOne({ emailAddress: alumniEmail }, { $push: { paymentDetails: paymentData } })
                // create payment Details
            await Payments.createPayment(reference, paymentStatus, amount, paid_at, channel, currency, payeeAcctName, bank, );

        } catch (error) {
            console.log(error.message)
        }
    }
    res.sendStatus(200);
}

// export webhook controller

module.exports = webhook;