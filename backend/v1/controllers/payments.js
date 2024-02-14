// imports
const Payments = require('../models/payments');

const getPaymentData = async(req, res) => {
    try {
        const { referenceId } = req.params
        const payData = await Payments.getByReferenceNumber(referenceId);
        return res.json(payData);
    } catch (error) {
        return res.json({ message: error.message })
    }
}

module.exports = {
    getPaymentData
}