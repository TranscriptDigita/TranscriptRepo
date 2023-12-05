const express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    controller = require('../controllers/studentsData'),
    { isAuthInstitution } = require('../middleware/auth')

// upload student data and verify certificate routes
router.route(`/`)
    .post(controller.uploadData);
router.route(`/verify`)
    .post(controller.verifyStudent)
    // testing upload
router.post("/testupload", function(request, response, next) {

    var storage = multer.diskStorage({

        destination: function(request, file, callback) {
            callback(null, './public');
        },
        filename: function(request, file, callback) {
            var temp_file_arr = file.originalname.split(".");

            var temp_file_name = temp_file_arr[0];

            var temp_file_extension = temp_file_arr[1];

            callback(null, temp_file_name + '-' + Date.now() + '.' + temp_file_extension);
        }

    });

    var upload = multer({ storage: storage }).single('sample_image');

    upload(request, response, function(error) {

        if (error) {
            console.log(error)
            return response.end('Error Uploading File');
        } else {
            console.log("File uploaded successful!")
            return response.end('File is uploaded successfully');
        }

    });

});
// export router
module.exports = router