const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const Result = require('../models/result')
const csvtojson = require('csvtojson')
    // const async = require('async')


var excelStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../public/excelUploads'); // file added to the public folder of the root directory
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
var excelUploads = multer({ storage: excelStorage });
// upload excel file and import in mongodb
exports.uploadData = (excelUploads.single("uploadfile"), (req, res) => {
    importFile('../public' + '/excelUploads/' + req.file.filename);

    function importFile(filePath) {
        //  Read Excel File to Json Data
        var arrayToInsert = [];
        const institutionId = req.user._id;
        csvtojson().fromFile(filePath).then(source => {
            // Fetching all the data from each row
            for (var i = 0; i < source.length; i++) {
                console.log(source[i]["student-name"])
                var singleRow = {
                    studentName: source[i]["student-name"],
                    registratioNumber: source[i]["registration-number"],
                    yearOfAdmission: source[i]["year-of-admission"],
                    yearOfGraduation: source[i]["year-of-graduation"],
                    cgp: source[i]["cgp"],
                    grade: source[i]["grade"],
                    institutionId: institutionId
                };
                arrayToInsert.push(singleRow);
            }
            //inserting into the table Result
            Result.insertMany(arrayToInsert, (err, result) => {
                if (err) console.log(err);
                if (result) {
                    console.log("File imported successfully.");
                    res.status(200).json({ message: "File imported successfully." });
                }
            });
        });
    }
})
exports.verifyStudent = async(req, res) => {
    // code will goes here
    try {
        const { registrationNumber, institutionId } = req.body;
        // verify if id is valid
        if (!mongoose.Types.ObjectId.isValid(institutionId)) {
            throw Error('not a valid institutionId')
        }

        // find record using student regitration number and intitution Id in db
        const findStudent = await Result.findOne({ registrationNumber, institutionId })

        // if not found throw error
        if (!findStudent) {
            return res.status(404).json({ message: "Record not found!" })
                // throw Error(`resource could ot be located`)
        }

        // return data and message as json
        res.status(200).json({ message: 'successful', data: findStudent })

    } catch (error) {
        // return status and error as json
        return res.status(403).json({ message: error.message })
    }

}