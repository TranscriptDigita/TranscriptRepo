// =================================
// ======= libararies required =====
// =================================
const mongoose = require('mongoose'),
    validator = require('validator')

// =======================================
// ====== Staff Schema =============
// =======================================

const staffSchema = new mongoose.Schema({
    emailAddress: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    institution: { type: Schema.Types.ObjectId, ref: 'Institution', required: true }, //[]
    isActive: { type: Boolean, default: true },

}, { timestamps: true })


// =============================================
// ======= statics functions ===================
// ================ Function to create new staff =============================

staffSchema.statics.createStaff = async function(emailAddress, role, institution) {
    // check if all inputs are filled
    if (!emailAddress || !role || !institution) {
        throw Error('All fields are required !')
    }
    // checking if email address entered is valid(type of email)
    if (!validator.isEmail(emailAddress)) {
        throw Error('email is not valid')
    }
    // check if email exists already in database
    const exists = await this.findOne({ emailAddress })

    // throw error if email already exists
    if (exists) {
        throw Error(`Try to use a different email. You have already created a staff with this email address: ${emailAddress}!`)
    }

    // saving staff in database
    const newStaff = await this.create({ emailAddress, role, institution })

    // returning the new created staff as json
    return newStaff
}

// ======== Function to fetch staff of an institution======

staffSchema.statics.fetchAllStaff = async function(institution) {
    // checking if the institution ID is passed as a parameter
    if (!institution) {
        throw Error('Institution ID is required!')
    }
    // checking if email exists already in database
    const allStaff = await this.find({ institution })

    // returning all the available staff as json
    return allStaff
}

// ======= Function to deactivate staff ===============

staffSchema.statics.deactivateStaffById = async function(id) {
        // checking if the staff ID is passed as a parameter
        if (!id) {
            throw Error('Staff ID is required!')
        }
        // verify if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('not a valid id')
        }
        // check if email exists already in database
        const staff = await this.findByIdAndUpdate({ id, isActive: false })

        // returning all the available staff as json
        return staff
    }
    // ======= modeling schema =====================
const Staff = mongoose.model('staff', staffSchema)

module.exports = Staff