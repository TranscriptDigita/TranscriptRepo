// ===========================
// === libraries requires ====
// ===========================
require('dotenv').config()
const jwt = require('jsonwebtoken'),
    Alumni = require('../models/alumni')


//=============================
// === auth permissions =======
// ============================

// function to check if user is authenticated
<<<<<<< HEAD
exports.isAuth = async (req, res, next) => {
=======
exports.isAuth = async(req, res, next) => {
>>>>>>> origin/godwin

    // distructure auth from request headers
    const { authorization } = req.headers

    try {
        // if not available throw error 
<<<<<<< HEAD
        if(!authorization){
=======
        if (!authorization) {
>>>>>>> origin/godwin
            throw Error('Authorization token required')
        }

        // getting token from auth
        const token = authorization.split(' ')[1]

        // destructuring and getting _id from verified jwt
<<<<<<< HEAD
        const {_id} = jwt.verify(token, process.env.SECRET_KEY)
        
        // searhing db and geting user using _id and assigning to req.user
        req.user = await Alumni.findOne({ _id }).select('_id')

        // if bot found throw error
        if(!req.user){
=======
        const { _id } = jwt.verify(token, process.env.SECRET_KEY)
        console.log({ id: _id })
            // searhing db and geting user using _id and assigning to req.user
        req.user = await Alumni.findOne({ _id }).select('_id')

        // if bot found throw error
        if (!req.user) {
>>>>>>> origin/godwin
            throw Error('token not accessible')
        }

        // call th enext set of function
        next()

    } catch (error) {
        // catch all errors and send as json
<<<<<<< HEAD
        res.status(401).json({error: 'Request is unauthorized', message: error.message})
=======
        res.status(401).json({ error: 'Request is unauthorized', message: error.message })
>>>>>>> origin/godwin
    }

}

module.exports = exports