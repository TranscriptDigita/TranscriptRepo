const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const Result = require('../models/result')
const csvtojson = require('csvtojson')

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
exports.uploadData = async(excelUploads.single("uploadfile"), (req, res) => {
    importFile('../public' + '/excelUploads/' + req.file.filename);

    function importFile(filePath) {
        //  Read Excel File to Json Data
        var arrayToInsert = [];
        csvtojson().fromFile(filePath).then(source => {
            // Fetching all the data from each row
            for (var i = 0; i < source.length; i++) {
                console.log(source[i]["name"])
                var singleRow = {
                    name: source[i]["name"],
                    email: source[i]["email"],
                    standard: source[i]["standard"],
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