// imports
const Payments = require('../models/payments');

const getPaymentData = async(req, res) => {
    try {
        const { referenceId, institutionId } = req.params
        if (referenceId) {
            const payData = await Payments.getByReferenceNumber(referenceId);
            return res.json(payData);
        } else if (institutionId) {
            // 
            const payData = await Payments.getAllPaymentsByInstitutionId(institutionId);
            return res.json(payData);
        }
    } catch (error) {
        return res.json({ message: error.message })
    }
}

module.exports = {
    getPaymentData
}