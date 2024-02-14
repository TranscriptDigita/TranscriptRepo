// imports
const PaymentsDetails = require('../model/payments');

const getPaymentData = async(req, res) => {
    try {
        const { referenceId } = req.params
        const payData = await PaymentsDetails.getByReferenceNumber(referenceId);
        return res.json(payData);
    } catch (error) {
        return res.json({ message: error.message })
    }
}

module.exports = {
    getPaymentData
}