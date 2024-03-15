// =================================
// ======= libararies required =====
// =================================
const mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    validator = require('validator')
const { Schema } = mongoose;

// =======================================
// ====== Staff Schema =============
// =======================================

const staffSchema = new mongoose.Schema({
    emailAddress: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    institution: { type: Schema.Types.ObjectId },
    isActive: { type: Boolean, default: true },
    verificationCode: { type: Number, default: 0 }

}, { timestamps: true })


// =============================================
// ======= statics functions ===================
// ================ Function to create new staff =============================

staffSchema.statics.createStaff = async function(emailAddress, password, role, institution) {
    // check if all inputs are filled
    if (!emailAddress || !password || !role || !institution) {
        throw Error('All fields are required !')
    }
    // use validator to validate email
    if (!validator.isEmail(emailAddress)) {
        throw Error('email is not valid')
    }

    // use validator check if password is strong enough
    // if (!validator.isStrongPassword(password)) {
    //     throw Error('password is not strong enough')
    // }

    // check if email exists already in database
    const exists = await this.findOne({ emailAddress })

    // throw error if email already exists
    if (exists) {
        throw Error(`Try to use a different email. You have already created a staff with this email address: ${emailAddress}!`)
    }
    // generating salt to hash password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    console.log(password);
    // saving staff in database
    const newStaff = await this.create({ emailAddress: emailAddress, password: hash, role: role, institution: institution })

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
    const staff = await this.findByIdAndUpdate(id, { isActive: false })

    // returning all the available staff as json
    return staff
}

// ======= Function to activate staff ===============

staffSchema.statics.activateStaffById = async function(id) {
        // checking if the staff ID is passed as a parameter
        if (!id) {
            throw Error('Staff ID is required!')
        }
        // verify if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('not a valid id')
        }
        // check if email exists already in database
        const staff = await this.findByIdAndUpdate(id, { isActive: true })

        // returning all the available staff as json
        return staff
    }
    // static function to login staff
staffSchema.statics.login = async function(emailAddress, password) {

    // validation
    if (!emailAddress || !password) {
        throw Error('All fields must be filled')
    }

    // find an email in database   
    const staff = await this.findOne({ emailAddress })

    // not exist throw error   
    if (!staff) {
        throw Error('Incorrect email')
    }

    // if account inactive throw error    
    if (!staff.isActive) {
        throw Error('sorry your account is deactivated')
    }
    // compare the user password
    const isMatch = await bcrypt.compare(password, staff.password);
    console.log(isMatch, password, staff.password);

    if (!isMatch) {
        throw Error('Incorrect password')
    }

    return staff;

}

// ======= modeling schema =====================
const Staff = mongoose.model('staff', staffSchema)

module.exports = Staff