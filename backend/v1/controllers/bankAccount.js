// =============================
// ======== libraries required =
// =============================
require('dotenv').config()
const Institution = require('../models/institution'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    validator = require('validator')

// =============================
// === funtion to create token==
// ============================= 
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '1d' })
}

// ===========================================
// ==== function that generates random nums ==
// ===========================================
//function to set up bank account details
exports.setupBankAccount = async(req, res, next) => {
    try {
        const { bankName, bankSortCode, accountName, accountNumber } = req.body;
        const id = req.user._id
        if (!bankName || !bankSortCode || !accountName || !accountNumber) {
            return res.status(403).json({ message: "All fields are required!" });
        }
        // verify if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(409).json({ message: "Not a valid id!" })
                // throw Error('Not a valid id')
        }

    } catch (error) {
        // return error code and message 
        return res.status(500).json({ message: error.message })
    }
}



module.exports = exports