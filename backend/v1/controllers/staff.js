// =============================
// ======== libraries required =
// =============================
require('dotenv').config()
const Staff = require('../models/staff'),
    mongoose = require('mongoose')


exports.createNewStaff = async(req, res) => {

        try {
            // destructure requestbody
            const { emailAddress, role, institution } = req.body

            // signup user using statics func
            const newStaff = await Staff.createStaff(emailAddress, role, institution)
                // return newly created staff as json
            return res.status(200).json({ newStaff })

        } catch (error) {
            // return error code and message 
            return res.status(400).json({ message: error.message })
        }

    }
    // function to get all Staff
exports.getAllStaff = async(req, res) => {
    try {
        const { institution } = req.params
            // find all staff in database
        let allStaff = await Staff.fetchAllStaff(institution)

        // if not allAlumnus throw error 
        if (!allStaff) {
            throw Error('resource could not be located !!')
        }

        // return status and data as json
        return res.status(200).json(allStaff)

    } catch (error) {
        // return status and error as json
        return res.status(403).json({ message: error.message })
    }
}


// Deactivating staff
exports.deactivateStaff = async(req, res) => {
    // get staffId from user parameters

    const { id } = req.body

    try {
        // Deactivating staff
        let deactivatedStaff = await Staff.deactivateStaffById(id)
        return res.status(200).json({ message: 'Staff has been succefully deactivated', deactivatedStaff })


    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}

module.exports = exports