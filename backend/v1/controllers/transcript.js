// imports
const Transcripts = require('../models/transcripts'),
    mongoose = require('mongoose')

const generateRefrenceId = () => {
    return `T-001`
}

exports.getAllTranscripts = async(req, res) => {
    let response = await Transcripts.find({})
    return res.json(response)
}

exports.createNewRequest = async(req, res) => {
    try {

        // getting the data from input by destructuring request body
        const { degreeType, institution, faculty, department, matricNumber, yearOfGraduation, program } = req.body

        // generate refrenceId
        var referenceId;
        const lastId = await Transcripts.findOne().sort({ _id: -1 })
            // console.log(lastId.referenceId)


        if (lastId == null) {
            referenceId = await generateRefrenceId()
                // return res.json(newId)
        } else {
            const splitted = await lastId.referenceId + 1 //.split('-')
            referenceId = splitted;
            // return res.json(splitted)
        }

        // getting userid from middleware
        const createdBy = req.user._id
            // creating new transcript request
        let newTranscript = await Transcripts.createNewTranscript(referenceId,
            degreeType,
            institution,
            faculty,
            department,
            matricNumber,
            yearOfGraduation,
            program,
            createdBy
        );
        // return succesful status code, message and the new creaed transcript
        return res.status(200).json({ message: "Transcripted Successfully created!", Transcript: newTranscript })

    } catch (error) {
        return res.json(error.message)
    }
}

// Track transcript
exports.trackTranscript = async(req, res) => {
    try {

        // getting the data from input by destructuring request body
        const { recipientName, deliveryAddress, deliveryContact } = req.body

        const transcriptStatus = await Transcripts.findOne({ recipientName, deliveryAddress, recipientPhoneNumber: deliveryContact })

        // If record found
        if (!transcriptStatus) {
            //    return status code with message
            return res.status(404).json({ message: "No match record!" })
        }
        var status = {}
        if (transcriptStatus.isSubmitted == true) {
            status.isSubmitted = transcriptStatus.isSubmitted
        }
        if (transcriptStatus.isVerified == true) {
            status.isVerified = transcriptStatus.isVerified
        }
        if (transcriptStatus.isApproved == true) {
            status.isApproved = transcriptStatus.isApproved
        }
        if (transcriptStatus.isQuerried == true) {
            status.isQuerried = transcriptStatus.isQuerried
        }
        if (transcriptStatus.isDeclined == true) {
            status.isDeclined = transcriptStatus.isDeclined
        }

        // return succesful status code, message and the new creaed transcript
        return res.status(200).json({
            status: status,
            transcript: transcriptStatus
        })

    } catch (error) {
        return res.json(error.message)
    }
}

// function to change transcript verification status
exports.verifyTranscript = async(req, res) => {
        try {

            // getting the data from input by destructuring request body
            const { id } = req.params
                // verify if id is valid
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw Error('not a valid id')
            }
            const verified = await Transcripts.findByIdAndUpdate(id, { isVerified: true, verfiedBy: req.user._id })

            // If record found
            if (!verified) {
                //    return status code with message
                return res.status(501).json({ message: "Something went wrong!" })
            }
            // return succesful status code, message and the new creaed transcript
            return res.status(200).json({
                message: 'verified successfully.',
                verified
            })

        } catch (error) {
            return res.json(error.message)
        }
    }
    // function to approve transcript
exports.approveTranscript = async(req, res) => {
        try {

            // getting the data from input by destructuring request body
            const { id } = req.params
                // verify if id is valid
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw Error('not a valid id')
            }
            const approved = await Transcripts.findByIdAndUpdate(id, { isApproved: true, approvedBy: req.user._id })

            // If record found
            if (!approved) {
                //    return status code with message
                return res.status(501).json({ message: "Something went wrong!" })
            }
            // return succesful status code, message and the new creaed transcript
            return res.status(200).json({
                message: 'approved successfully.',
                approved
            })

        } catch (error) {
            return res.json(error.message)
        }
    }
    // function to change transcript querry status
exports.querryTranscript = async(req, res) => {
    try {

        // getting the data from input by destructuring request body
        const { id } = req.params
            // verify if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('not a valid id')
        }
        const querried = await Transcripts.findByIdAndUpdate(id, { isQuerried: true, querriedBy: req.user._id })

        // If record found
        if (!querried) {
            //    return status code with message
            return res.status(501).json({ message: "Something went wrong!" })
        }
        // return succesful status code, message and the new creaed transcript
        return res.status(200).json({
            message: 'querried successfully.',
            querried
        })

    } catch (error) {
        return res.json(error.message)
    }
}

// function to decline transcript
exports.declineTranscript = async(req, res) => {
    try {

        // getting the data from input by destructuring request body
        const { id } = req.params
            // verify if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('not a valid id')
        }
        const declined = await Transcripts.findByIdAndUpdate(id, { isDeclined: true, declinedBy: req.user._id })

        // If record found
        if (!declined) {
            //    return status code with message
            return res.status(501).json({ message: "Something went wrong!" })
        }
        // return succesful status code, message and the new creaed transcript
        return res.status(200).json({
            message: 'declined successfully.',
            declined
        })

    } catch (error) {
        return res.json(error.message)
    }
}

module.exports = exports