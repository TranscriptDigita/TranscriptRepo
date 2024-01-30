// imports
const Transcripts = require('../models/transcripts'),
    Logistic = require('../models/logistic'),
    mongoose = require('mongoose')

// Function to generate transcript reference id
const genTrnxRefId = async() => {
    // find last transcript reference id in the database
    const lastId = await Transcripts.findOne().sort({ _id: -1 });
    // initializing transcript refence id
    var referenceId;
    // if there is no transcript in the database yet
    if (lastId == null) {
        referenceId = `Trxt-001`
        return referenceId;
    } else {
        const lastRefId = lastId.referenceId;
        // console.log({ "last": lastId });
        // console.log({ "lastRefId": lastRefId });
        const splitted = lastRefId.split('-');
        const numPart = splitted[1];
        // parse and increment the numPart
        const parseNum = Number.parseInt(numPart) + 1;
        if (parseNum >= 10) {
            referenceId = splitted[0] + '-0' + parseNum;
            // console.log({ referenceId });
            return referenceId;
        }
        referenceId = splitted[0] + '-00' + parseNum;
        return referenceId;
    }


}


// Fetch transcript by transcript id
exports.getTranscriptById = async(req, res) => {
    try {
        const { transcriptId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(transcriptId)) {
            throw Error('Not a valid id')
        }
        let response = await Transcripts.findById(transcriptId)
        return res.json(response)
    } catch (error) {
        res.json({ message: error.message })
    }
}

// Fetch transcript by transcript id
exports.getTranscriptByAlumniId = async(req, res) => {
    try {
        const { alumniId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(alumniId)) {
            throw Error('Not a valid id.')
        }
        let response = await Transcripts.find({ createdBy: alumniId })
        return res.json(response)
    } catch (error) {
        res.json({ message: error.message })
    }
}


// Fetch all transcripts
exports.getAllTranscripts = async(req, res) => {
    let response = await Transcripts.find({})
    return res.json(response)
}

// create new transcript request
exports.createNewRequest = async(req, res) => {
    try {

        // getting the data from input by destructuring request body
        const { degreeType, institution, faculty, department, matricNumber, yearOfGraduation, program } = req.body
            // generate refrenceId
            // find last transcript reference id in the database
        const lastId = await Transcripts.findOne().sort({ _id: -1 });

        // initializing transcript refence id
        var referenceId;
        // if there is no transcript in the database yet
        if (lastId == null) {
            referenceId = `Trxt-001`
        } else {
            const lastRefId = lastId.referenceId;
            // console.log({ "last": lastId });
            // console.log({ "lastRefId": lastRefId });
            const splitted = lastRefId.split('-');
            const numPart = splitted[1];
            // parse and increment the numPart
            const parseNum = Number.parseInt(numPart) + 1;
            if (parseNum >= 10) {
                referenceId = splitted[0] + '-0' + parseNum;
            } else {
                referenceId = splitted[0] + '-00' + parseNum;
            }
        }

        //here
        // const referenceId = await genTrnxRefId();
        // console.log("Here: " + referenceId);
        // getting userid from middleware
        const createdBy = req.user._id;
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
        return res.json("error" + error.message)
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
        const verified = await Transcripts.findByIdAndUpdate(id, { isVerified: true, verfiedBy: req.user._id }, { new: true, useFindAndModify: false })

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
            throw Error('not a valid id');
        }
        const approved = await Transcripts.findByIdAndUpdate(id, { isApproved: true, isDeclined: false, approvedBy: req.user._id }, { new: true, useFindAndModify: false })

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
        const querried = await Transcripts.findByIdAndUpdate(id, { isQuerried: true, isDeclined: false, isApproved: false, querriedBy: req.user._id }, { new: true, useFindAndModify: false })

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
        const declined = await Transcripts.findByIdAndUpdate(id, { isDeclined: true, isApproved: false, declinedBy: req.user._id }, { new: true, useFindAndModify: false })

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

// function for  transcript delivery method
exports.deliveryMethod = async(req, res) => {
    try {

        // getting the data from input by destructuring request body
        const { transcriptId } = req.params;
        const { typeOfTranscript, modeOfDelivery, recipientCountry, recipientAddress, recipientPhoneNumber, recipientEmail, preferCourier } = req.body;
        // verify if id is valid
        if (!mongoose.Types.ObjectId.isValid(transcriptId)) {
            throw Error('Not a valid id')
        }
        if (!preferCourier) {
            throw Error('Prefer courier service is required!')
        }
        // get courier details
        let courierResponse = await Logistic.findOne({ businessName: preferCourier });
        let courierContactPhoneNumber = courierResponse.contactPhoneNumber;
        let courierHeadOfficeAddress = courierResponse.headOfficeAddress;

        const transcriptUpdated = await Transcripts.findByIdAndUpdate(transcriptId, { typeOfTranscript, modeOfDelivery, recipientCountry, recipientAddress, recipientPhoneNumber, recipientEmail, preferCourier, courierContactPhoneNumber, courierHeadOfficeAddress }, { new: true, useFindAndModify: false })

        // If record found
        if (!transcriptUpdated) {
            //    return status code with message
            return res.status(404).json({ message: "Incorrect transcript ID passed!" })
        }
        // return succesful status code, message and the new creaed transcript
        return res.status(200).json({
            message: 'Delivery method updated successfully.',
            transcriptUpdated
        })

    } catch (error) {
        return res.json(error.message)
    }
}

module.exports = exports