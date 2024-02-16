// imports
const Payments = require('../models/payments');

const getPaymentData = async(req, res) => {
    try {
        const { referenceId, institutionName } = req.params
        if (referenceId) {
            const payData = await Payments.getByReferenceNumber(referenceId);
            return res.json(payData);
        } else if (institutionName) {
            // 
            const payData = await Payments.getAllPaymentsByInstitutionId(institutionName);
            return res.json(payData);
        }
    } catch (error) {
        return res.json({ message: error.message })
    }
}

module.exports = {
    getPaymentData
}