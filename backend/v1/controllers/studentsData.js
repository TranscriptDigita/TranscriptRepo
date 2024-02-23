const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const Result = require('../models/result')
const csvtojson = require('csvtojson')
    // const async = require('async')
var excelStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/excelUploads'); // file added to the public folder of the root directory
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
var excelUploads = multer({ storage: excelStorage });
// upload excel file and import in mongodb
exports.uploadData = function(req, res, next) {

    var storage = multer.diskStorage({

        destination: function(req, file, callback) {
            callback(null, './public/excelUploads');
        },
        filename: function(req, file, callback) {
            callback(null, file.originalname);
        }

    });

    var upload = multer({ storage: storage }).single('uploadfile');

    upload(req, res, function(error) {
        // console.log(req.file);

        if (error) {
            console.log(error)
            return res.end('Error Uploading File');
        } else {
            importFile(req.file.path);

            function importFile(filePath) {
                //  Read Excel File to Json Data
                var arrayToInsert = [];
                const institutionId = req.user;
                csvtojson().fromFile(filePath).then(async(response) => {
                    // Fetching all the data from each row
                    console.log(response)
                    for (var i = 0; i < response.length; i++) {
                        console.log(response[i].studentName);
                        var singleRow = {
                            studentName: response[i].student_name,
                            registrationNumber: response[i].registration_number,
                            yearOfAdmission: response[i].year_of_admission,
                            yearOfGraduation: response[i].year_of_graduation,
                            cgp: response[i].cgp,
                            grade: response[i].grade,
                            institutionId: institutionId
                        };
                        arrayToInsert.push(singleRow);
                    }
                    // console.log(arrayToInsert);
                    //inserting into the table Result
                    const fb = await Result.insertMany(arrayToInsert);
                    if (fb) {
                        console.log("File imported successfully.");
                        res.status(200).json({ message: "File imported successfully." });
                    } else {
                        console.log("File Not imported.");
                        res.status(409).json({ message: "File Not imported To DB." });
                    }

                });
            }
        }

    });

}

exports.uploadDat = (excelUploads.single("studentsdata"), (req, res) => {
    console.log(req.file);
    if (!req.file) {
        return res.status(403).json({ message: "File is required!" })
    }
    importFile('../public' + '/excelUploads/' + req.file.filename);

    function importFile(filePath) {
        //  Read Excel File to Json Data
        var arrayToInsert = [];
        const institutionId = req.user;
        csvtojson().fromFile(filePath).then(response => {
            // Fetching all the data from each row
            for (var i = 0; i < response.length; i++) {
                console.log(response[i]["student-name"])
                var singleRow = {
                    studentName: response[i]["student-name"],
                    registratioNumber: response[i]["registration-number"],
                    yearOfAdmission: response[i]["year-of-admission"],
                    yearOfGraduation: response[i]["year-of-graduation"],
                    cgp: response[i]["cgp"],
                    grade: response[i]["grade"],
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
            throw Error('Not a valid institutionId')
        }

        // find record using student regitration number and intitution Id in db
        const findStudent = await Result.findOne({ registrationNumber: registrationNumber, institutionId: institutionId })
        console.log(findStudent);
        // if not found throw error
        if (!findStudent.institutionId) {
            return res.status(404).json({ message: "Record not found!" })
                // throw Error(`reresponse could ot be located`)
        }
        // return data and message as json
        res.status(200).json({ message: 'successful', data: findStudent })
    } catch (error) {
        // return status and error as json
        return res.status(403).json({ message: error.message })
    }

}

// Fetch all students data
exports.studentsResult = async(req, res) => {
    // code will goes here
    try {
        // find record using student regitration number and intitution Id in db
        const findStudents = await Result.find({})

        // if not found throw error
        if (!findStudents) {
            return res.status(404).json({ message: "Record not found!" })
                // throw Error(`reresponse could ot be located`)
        }

        // return data and message as json
        res.status(200).json({ message: 'successful', data: findStudents })

    } catch (error) {
        // return status and error as json
        return res.status(403).json({ message: error.message })
    }

}