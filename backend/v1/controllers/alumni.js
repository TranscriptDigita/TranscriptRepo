// =============================
// ==== libraries required =====
// =============================
require('dotenv').config()
const Alumni = require('../models/alumni'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    validator = require('validator'),
    bcrypt = require('bcryptjs'),
    fs = require('fs')

const htmlContent = fs.readFileSync('./views/welcomeEmail.html', 'utf-8')


// =============================
// === funtion to create token==
// ============================= 
const createToken = (_id) => {
<<<<<<< HEAD
    return jwt.sign({_id}, process.env.SECRET_KEY, {expiresIn: '1d'})
=======
    return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '1d' })
>>>>>>> origin/godwin
}

// ===========================================
// ==== function that generates random nums ==
// ===========================================

const generateRandomNumber = () => {
    const length = 5;
<<<<<<< HEAD
  
    // Generate random number with a specified length
    const randomNumber = Math.floor(Math.random() * 10 ** length);
  
    // Pad the number with leading zeros to ensure it has exactly five digits
    const formattedNumber = randomNumber.toString().padStart(length, "0");
  
=======

    // Generate random number with a specified length
    const randomNumber = Math.floor(Math.random() * 10 ** length);

    // Pad the number with leading zeros to ensure it has exactly five digits
    const formattedNumber = randomNumber.toString().padStart(length, "0");

>>>>>>> origin/godwin
    return formattedNumber;
}

// =====================================
// ===== Alumni controller functions ===
// =====================================

// function to get all Alumnus
<<<<<<< HEAD
exports.getAllAlumnus = async (req, res) => {
    try {
        
=======
exports.getAllAlumnus = async(req, res) => {
    try {

>>>>>>> origin/godwin
        // find all alumni in database
        let allAlumnus = await Alumni.find({})

        // if not allAlumnus throw error 
<<<<<<< HEAD
        if(!allAlumnus){
=======
        if (!allAlumnus) {
>>>>>>> origin/godwin
            throw Error('resource could not be located !!')
        }

        // return status and data as json
        return res.status(201).json(allAlumnus)

    } catch (error) {
        // return status and error as json
<<<<<<< HEAD
        return res.status(403).json({message: error.message})
=======
        return res.status(403).json({ message: error.message })
>>>>>>> origin/godwin
    }
}

// function to get single Alumni
<<<<<<< HEAD
exports.getAlumniById = async ( req, res) => {
    const {id} = req.params

    try {
        // verify if id is valid
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw Error('not a valid id')   
=======
exports.getAlumniById = async(req, res) => {
    const { id } = req.params

    try {
        // verify if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('not a valid id')
>>>>>>> origin/godwin
        }

        // find alumni using db using id
        let alumni = await Alumni.findById(id)

        // if not found throw error
<<<<<<< HEAD
        if(!alumni){
=======
        if (!alumni) {
>>>>>>> origin/godwin
            throw Error(`resource could ot be located`)
        }

        // return data and message as json
<<<<<<< HEAD
        res.status(200).json({message: 'successful', data: alumni})

    } catch (error) {
        // return status and error as json
        return res.status(403).json({message: error.message})
=======
        res.status(200).json({ message: 'successful', data: alumni })

    } catch (error) {
        // return status and error as json
        return res.status(403).json({ message: error.message })
>>>>>>> origin/godwin
    }
}


//function to create new alumni account
<<<<<<< HEAD
exports.createAlumni = async (req, res) => {

    // destructuring request body
    let {fullName, emailAddress, password} = req.body

   try {
=======
exports.createAlumni = async(req, res) => {

    // destructuring request body
    let { fullName, emailAddress, password } = req.body

    try {
>>>>>>> origin/godwin
        // generate verification code
        let verificationCode = await generateRandomNumber()

        // signup user using static function   
        const alumni = await Alumni.signup(fullName, emailAddress, password, verificationCode)

        // create a token
        const token = createToken(alumni._id)

        // send welcome email
        await Alumni.sendEmail(emailAddress, 'Welcome to Transcript-Digita', `verfication code: ${verificationCode}`)

        // return status code and data as json
<<<<<<< HEAD
        return res.status(200).json({alumni: alumni, token: token}) 

   } catch (error) {
        // return error code and message 
        return res.status(400).json({message: error.message})
   }
}

// forgot password
exports.forgotPassword = async (req, res) => {
    try {
        
        // get all info from parameters
        const { emailAddress } = req.body;
        const foundAlumni = await Alumni.findOne({ emailAddress });
        
=======
        return res.status(200).json({ alumni: alumni, token: token })

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}

// forgot password
exports.forgotPassword = async(req, res) => {
    try {

        // get all info from parameters
        const { emailAddress } = req.body;
        const foundAlumni = await Alumni.findOne({ emailAddress });

>>>>>>> origin/godwin
        // check if email exists in database
        if (!foundAlumni) {
            throw Error('Email does not exist in our database')
        }

        // Generate a reset token
        const resetToken = await generateRandomNumber()

        // Set the reset token and expiration time in the foundAlumni document
        foundAlumni.resetPasswordToken = resetToken;
        foundAlumni.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour

        // save resetToken and expiry date in database
        await foundAlumni.save();

        // send password reset email
        await Alumni.sendEmail(emailAddress, 'Reset password', `Password reset link: https://transcript360.onrender.com/alumni/reset-password/${resetToken}`)

        // debug here for errors
<<<<<<< HEAD
        return res.status(200).json({message: `verification email successfully sent`, alumni: foundAlumni})

    } catch (error) {
         // return error code and message 
         return res.status(400).json({message: error.message})
=======
        return res.status(200).json({ message: `verification email successfully sent`, alumni: foundAlumni })

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
>>>>>>> origin/godwin
    }
}


// password reset
<<<<<<< HEAD
exports.passwordReset = async (req, res) => {
=======
exports.passwordReset = async(req, res) => {
>>>>>>> origin/godwin
    try {
        const { token } = req.params;
        const { password } = req.body;

        // find alumni using token and expiry time
        const foundAlumni = await Alumni.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        // if alumni not found throw error
        if (!foundAlumni) {
            throw Error("Password reset token is invalid or has expired");
        }

        // check password strength
        // using validator to check if password is strong
<<<<<<< HEAD
        if(!validator.isStrongPassword(password)){
            throw Error ('password not strong enough')
=======
        if (!validator.isStrongPassword(password)) {
            throw Error('password not strong enough')
>>>>>>> origin/godwin
        }
        // hash password
        // generating salt to hash password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        // Update the foundAlumni's password
        foundAlumni.password = hash;
        foundAlumni.resetPasswordToken = '';
        foundAlumni.resetPasswordExpires = '';

        await foundAlumni.save();

        return res.status(200).json({ message: "Password reset successful", alumni: foundAlumni });
<<<<<<< HEAD
        
    } catch (error) {
         // return error code and message 
         return res.status(400).json({message: error.message})
=======

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
>>>>>>> origin/godwin
    }
}

// verify a recently registered user
<<<<<<< HEAD
exports.verifyAlumnus = async (req, res) => {
   // get alumnusId and verificationCode from user parameters
   
   const {verificationCode, id} = req.body
   
    try {
        // verify if id is valid
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw Error('not a valid id')   
=======
exports.verifyAlumnus = async(req, res) => {
    // get alumnusId and verificationCode from user parameters

    const { verificationCode, id } = req.body

    try {
        // verify if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('not a valid id')
>>>>>>> origin/godwin
        }

        // find alumnus in database
        const foundAlumni = await Alumni.findById(id)

        // if user not found in database throw error
<<<<<<< HEAD
        if(!foundAlumni){
=======
        if (!foundAlumni) {
>>>>>>> origin/godwin
            throw Error('This user doesnt exist in our database')
        }

        // not match throw error
<<<<<<< HEAD
        if(verificationCode != foundAlumni.verfificationCode){
=======
        if (verificationCode != foundAlumni.verfificationCode) {
>>>>>>> origin/godwin
            throw Error('Incorrect verfication code')
        }

        // compare params code with found users verification code
<<<<<<< HEAD
        if(verificationCode === foundAlumni.verfificationCode){
            let verifiedAlumni = await Alumni.findByIdAndUpdate(id, {isVerified: true}, {new: true, useFindAndModify: false})
            return res.status(200).json({message: 'successfully updated', alumni: verifiedAlumni})
=======
        if (verificationCode === foundAlumni.verfificationCode) {
            let verifiedAlumni = await Alumni.findByIdAndUpdate(id, { isVerified: true }, { new: true, useFindAndModify: false })
            return res.status(200).json({ message: 'successfully updated', alumni: verifiedAlumni })
>>>>>>> origin/godwin
        }

    } catch (error) {
        // return error code and message 
<<<<<<< HEAD
        return res.status(400).json({message: error.message})
=======
        return res.status(400).json({ message: error.message })
>>>>>>> origin/godwin
    }
}

// login Alumni
<<<<<<< HEAD
exports.loginAlumnus = async (req, res) => {
    const {emailAddress, password} = req.body
=======
exports.loginAlumnus = async(req, res) => {
    const { emailAddress, password } = req.body
>>>>>>> origin/godwin

    try {
        // login alumni
        const alumni = await Alumni.login(emailAddress, password)

<<<<<<< HEAD
        if(!alumni){
=======
        if (!alumni) {
>>>>>>> origin/godwin
            throw Error('Login unsucessful')
        }
        // create a token
        const token = createToken(alumni._id)

<<<<<<< HEAD
        return res.status(200).json({alumni, token})

    } catch (error) {
        // return error code and message 
        return res.status(400).json({message: error.message})
    }
} 

// update alumni information
exports.updateAlumni = async (req, res) => {
    const {id} = req.params
=======
        return res.status(200).json({ alumni, token })

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}

// update alumni information
exports.updateAlumni = async(req, res) => {
    const { id } = req.params
>>>>>>> origin/godwin
    const {
        fullName,
        matricNo,
        phoneNumber,
        emailAddress,
        paymentDetails,
<<<<<<< HEAD
        yearOfgraduation,
        monthOfGraduation,
        departmant
    } = req.body

    try {
        // verify if id is valid
        if(!mongoose.Types.ObjectId.isValid(alumniId)){
            throw Error('not a valid id')   
        }
        
    } catch (error) {
        // return error code and message 
        return res.status(400).json({message: error.message})
=======
        yearOfGraduation,
        monthOfGraduation,
        department
    } = req.body

    try {
        // verify if id is of mongoose type
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('not a valid id')
        }
        // find alumnus in database the id and update
        let updatedDetails = await Alumni.update(id, {
            fullName,
            matricNo,
            phoneNumber,
            emailAddress,
            paymentDetails,
            yearOfGraduation,
            monthOfGraduation,
            department
        });
        // return succesful status code, message and the updated user
        return res.status(200).json({ message: "Alumni updated!", Alumni: updatedDetails })

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
>>>>>>> origin/godwin
    }
}

// delete Alumni
<<<<<<< HEAD
exports.deleteAlumni = async (req, res) => {
    const {id} = req.params

    try {
        // verify if id is valid
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw Error('not a valid id')   
=======
exports.deleteAlumni = async(req, res) => {
    const { id } = req.params

    try {
        // verify if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error('not a valid id')
>>>>>>> origin/godwin
        }

        // search alumni db and delete item with the id
        let deletedAlumni = await Alumni.findByIdAndDelete(id)

<<<<<<< HEAD
        if(!deletedAlumni){
            throw Error('this resource could not be deleted, it seems it doest exist in our database')
        }

        return res.status(200).json({message: 'successfully deleted', data: deletedAlumni})

    } catch (error) {
        // return error code and message 
        return res.status(400).json({message: error.message})
    }
}

module.exports = exports
=======
        if (!deletedAlumni) {
            throw Error('this resource could not be deleted, it seems it doest exist in our database')
        }

        return res.status(200).json({ message: 'successfully deleted', data: deletedAlumni })

    } catch (error) {
        // return error code and message 
        return res.status(400).json({ message: error.message })
    }
}

module.exports = exports
>>>>>>> origin/godwin
