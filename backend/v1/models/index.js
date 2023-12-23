// ==================================
// ====== required libraries ========
// ==================================
require('dotenv').config()
const mongoose = require('mongoose')


// ==================================
// ====== connecting to database ====
// ==================================
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('Database connected !!!')
//     })
//     .catch((error) => {
//         console.log('Error connecting to DB !', error)
//     })

const connectDB = async() => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Database connected !!!')
        })
        .catch(function(error) {
            console.log(`Unable to connect to the Mongo db  ${error} `);
        });
};

// use as a function        
connectDB();