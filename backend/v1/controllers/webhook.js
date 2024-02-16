// imports
const Transcripts = require('../models/transcripts'),
    Payments = require('../models/payments'),
    Alumni = require('../models/alumni'),
    Institution = require('../models/institution');
const crypto = require('crypto');
const secret = process.env.SECRET_KEY;
// webhook controller
const webhook = async(req, res) => {
    try {
        //validate event
        const event = req.body;
        console.log(event);
        if (event.data.status == "success") {
            var reference, paymentStatus, amount, paid_at, created_at, channel, currency, payeeAcctName, bank, alumniEmail;
            if (event.data.channel == "card") {
                reference = event.data.reference,
                    paymentStatus = event.data.status,
                    amount = event.data.amount / 100,
                    paid_at = event.data.paid_at,
                    created_at = event.data.created_at,
                    channel = event.data.channel,
                    currency = event.data.currency,
                    payeeAcctName = event.data.authorization.account_name,
                    bank = event.data.authorization.bank,
                    alumniEmail = event.data.customer.email
            } else if (event.data.channel == "bank_transfer") {
                reference = event.data.reference,
                    paymentStatus = event.data.status,
                    amount = event.data.amount / 100,
                    paid_at = event.data.paid_at,
                    created_at = event.data.created_at,
                    channel = event.data.channel,
                    currency = event.data.currency,
                    payeeAcctName = event.data.authorization.sender_name,
                    bank = event.data.authorization.sender_bank,
                    alumniEmail = event.data.customer.email
            } else if (event.data.channel == "bank") {
                reference = event.data.reference,
                    paymentStatus = event.data.status,
                    amount = event.data.amount / 100,
                    paid_at = event.data.paid_at,
                    created_at = event.data.created_at,
                    channel = event.data.channel,
                    currency = event.data.currency,
                    payeeAcctName = "Not Available",
                    bank = event.data.authorization.bank,
                    alumniEmail = event.data.customer.email
            }
            let paymentData = {
                reference: reference,
                paymentStatus: paymentStatus,
                amount: amount,
                createdAt: created_at,
                paidAt: paid_at,
                paymentChennel: channel,
                currency: currency,
                paymentAccountName: payeeAcctName,
                bank: bank,
            }

            const findTranscript = await Transcripts.findOne({ _id: reference })
                // If record found
            if (!findTranscript) {
                throw Error("Something went wrong!");
            }
            var inAmount;
            let institutionId = findTranscript.institutionId;
            let docType = findTranscript.typeOfDocument;

            const findInstitution = await Institution.findOne({ _id: institutionId });
            // If record found
            if (!findInstitution) {
                throw Error("Resource not found!");
            }
            if (docType == "Certificate") {
                inAmount = findInstitution.amountForCertificate;
            } else if (docType == "Official Transcript") {
                inAmount = findInstitution.amountForPhysicalMode;
            } else if (docType == "Personal Transcript") {
                inAmount = findInstitution.amountForElectronicalMode;
            } else if (docType == "Statement of Result") {
                inAmount = findInstitution.amountForStatementOfResult;
            }
            // save the record in database
            findTranscript.isPaid = true;
            findTranscript.paymentStatus = paymentStatus;
            findTranscript.amountPaid = amount;
            await findTranscript.save();
            await Alumni.updateOne({ emailAddress: alumniEmail }, { $push: { paymentDetails: paymentData } })
            const alum = await Alumni.findOne({ emailAddress: alumniEmail });
            let alumniName = alum.fullName;
            let institutionName = findInstitution.name;
            // create payment Details
            const payD = await Payments.createPayment(institutionName, alumniName, reference, paymentStatus, inAmount, paid_at, channel, currency, payeeAcctName, bank, );
            console.log(payD);

        }
        res.sendStatus(200);
    } catch (error) {
        console.log(error.message)
    }
}

// export webhook controller

module.exports = webhook;