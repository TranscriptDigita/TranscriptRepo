// =============================
// ======== libraries required =======
// =============================
require('dotenv').config()
const Institution = require('../models/institution'),
    Transcripts = require('../models/transcripts')
mongoose = require('mongoose'),
    // jwt = require('jsonwebtoken'),
    validator = require('validator')

// function to generate api key for institution
const genAPIKey = () => {
    // creating a base-36 string that contains 30 chars in a-z, 0-9
    return [...Array(30)]
        .map((e) => ((Math.random() * 36) | 0).toString(36))
        .join('');
};

// ===========================================
// ==== function that create API key for developer use ==
// ===========================================

exports.createAPIKeyAPI = async() => {
    const institutionId = req.user._id;

    // involve the genAPIKey function and assign the return value to API Key
    const apiKey = genAPIKey();

    // create institution API Key using statics function
    const key = await Institution.createAPIKey(institutionId, apiKey);
    // return api key as json
    return res.status(200).json({ message: "API Key has been successfully created", apiKey: key })
}

// Create transcript API for developers use
exports.createTranscriptAPI = async(req, res) => {
    try {
        const { apiKey } = req.params;
        // getting the data from input by destructuring request body
        const { degreeType, faculty, department, matricNumber, yearOfGraduation, program } = req.body
        if (!apiKey) {
            return res.status(401).json({ message: "apiKey is required" })
        }
        const institute = await Institution.findOne({ apiKey })
        if (institute == null) {
            return res.status(404).json({ message: "Incorrect apiKey passed!" })
        }
        const institution = institute.name;
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


// Fetch all institution transcripts API for developers use
exports.getAllTranscriptsAPI = async(req, res) => {
    try {
        const { apiKey } = req.params;
        if (!apiKey) {
            return res.status(401).json({ message: "apiKey is required" })
        }
        const institute = await Institution.findOne({ apiKey })
        if (institute == null) {
            return res.status(404).json({ message: "Incorrect apiKey passed!" })
        }
        const institution = institute.name
        let response = await Transcripts.find({ institution })
        return res.json(response)

    } catch (error) {
        return res.json(error.message)
    }
}


// Tracking transcript API for developers
exports.trackTranscriptAPI = async(req, res) => {
        try {
            const { apiKey } = req.params;
            // getting the data from input by destructuring request body
            const { recipientName, deliveryAddress, deliveryContact } = req.body
            if (!apiKey) {
                return res.status(401).json({ message: "apiKey is required" })
            }
            // checking if apiKey exist in the database
            const institution = await Institution.findOne({ apiKey })
            if (institution == null) {
                return res.status(404).json({ message: "Incorrect apiKey passed!" })
            }

            // finding the transcript
            const transcriptStatus = await Transcripts.findOne({ recipientName, deliveryAddress, recipientPhoneNumber: deliveryContact })

            // If record not found
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
    // create new transcript for developers use
exports.createNewTranscriptRequestAPI = async(req, res) => {
    try {
        const { apiKey } = req.params;
        if (!apiKey) {
            return res.status(401).json({ message: "apiKey is required" })
        }
        const institute = await Institution.findOne({ apiKey })
        if (institute == null) {
            return res.status(404).json({ message: "Incorrect apiKey passed!" })
        }
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
        // return succesful status code, message and the new created transcript
        return res.status(200).json({ message: "Transcripted Successfully created!", Transcript: newTranscript })

    } catch (error) {
        return res.json(error.message)
    }
}

// verify transcript API for developer
exports.verifyTranscriptAPI = async(req, res, next) => {
    try {
        const { apiKey, transcriptId } = req.params;
        if (!apiKey || !transcriptId) {
            return res.status(401).json({ message: "apiKey and transcriptId are required!" })
        }
        // checking if apiKey exist in the databse
        const institution = await Institution.findOne({ apiKey })
        if (institution == null) {
            return res.status(404).json({ message: "Incorrect apiKey passed!" })
        }
        const verifier = institution._id;
        // verifying the transcript by the transcriotId
        const verified = await Transcripts.findByIdAndUpdate(transcriptId, { isVerified: true, verfiedBy: verifier })

        // If record not found and updated
        if (!verified) {
            //    return status code with message
            return res.status(501).json({ message: "Something went wrong!" })
        }
        // return succesful status code, message and the virified transcript
        return res.status(200).json({
            message: 'Verified successfully.',
            verified
        })
    } catch (error) {
        return res.json(error.message)
    }
}

// approve transcript API for developer
exports.approveTranscriptAPI = async(req, res, next) => {
    try {
        const { apiKey, transcriptId } = req.params;
        if (!apiKey || !transcriptId) {
            return res.status(401).json({ message: "apiKey and transcriptId are required!" })
        }
        // checking if apiKey is exist in the database
        const institution = await Institution.findOne({ apiKey })
        if (institution == null) {
            return res.status(404).json({ message: "Incorrect apiKey passed!" })
        }
        const approver = institution._id;
        // approve the transcript by the transcriptId
        const approved = await Transcripts.findByIdAndUpdate(transcriptId, { isApproved: true, approvedBy: approver })

        // If record not found and updated
        if (!approved) {
            //    return status code with message
            return res.status(501).json({ message: "Something went wrong!" })
        }
        // return succesful status code, message and the approved transcript
        return res.status(200).json({
            message: 'Approved successfully.',
            approved
        })
    } catch (error) {
        return res.json(error.message)
    }
}

// decline transcript API for developer
exports.declineTranscriptAPI = async(req, res, next) => {
    try {
        const { apiKey, transcriptId } = req.params;
        if (!apiKey || !transcriptId) {
            return res.status(401).json({ message: "apiKey and transcriptId are required!" })
        }
        // checking if apiKey is exist in the database
        const institution = await Institution.findOne({ apiKey })
        if (institution == null) {
            return res.status(404).json({ message: "Incorrect apiKey passed!" })
        }
        const decliner = institution._id;
        // decline the transcript by the transcriptId
        const declined = await Transcripts.findByIdAndUpdate(transcriptId, { isDeclined: true, declinedBy: decliner })

        // If record not found and updated
        if (!declined) {
            //    return status code with message
            return res.status(501).json({ message: "Something went wrong!" })
        }
        // return succesful status code, message and the ceclined transcript
        return res.status(200).json({
            message: 'Declined successfully.',
            declined
        })
    } catch (error) {
        return res.json(error.message)
    }
}

// query transcript API for developer
exports.queryTranscriptAPI = async(req, res, next) => {
    try {
        const { apiKey, transcriptId } = req.params;
        if (!apiKey || !transcriptId) {
            return res.status(401).json({ message: "apiKey and transcriptId are required!" })
        }
        // checking if apiKey is exist in the database
        const institution = await Institution.findOne({ apiKey })
        if (institution == null) {
            return res.status(404).json({ message: "Incorrect apiKey passed!" })
        }
        const querrier = institution._id;
        // decline the transcript by the transcriptId
        const querried = await Transcripts.findByIdAndUpdate(transcriptId, { isQuerried: true, querriedBy: querrier })

        // If record not found and updated
        if (!querried) {
            //    return status code with message
            return res.status(501).json({ message: "Something went wrong!" })
        }
        // return succesful status code, message and the querried transcript
        return res.status(200).json({
            message: 'Querried successfully.',
            querried
        })
    } catch (error) {
        return res.json(error.message)
    }
}


module.exports = exports