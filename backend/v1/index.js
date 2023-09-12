// ===============================================
// ============ libararies required ==============
// ===============================================
require('dotenv').config()
const express = require('express'),
<<<<<<< HEAD
      app    = express(),
      cors = require('cors'),
      path = require('path'),
      bodyParser = require('body-parser'),
      models = require('./models/'),
      alumniRoutes = require('./routes/alumni'),
      institutionRoutes = require('./routes/institution'),
      transcriptRoutes = require('./routes/transcripts')
      
=======
    app = express(),
    cors = require('cors'),
    path = require('path'),
    bodyParser = require('body-parser'),
    models = require('./models/'),
    alumniRoutes = require('./routes/alumni'),
    institutionRoutes = require('./routes/institution'),
    transcriptRoutes = require('./routes/transcripts'),
    contactUsRoutes = require('./routes/contact'),
    staffRoutes = require('./routes/staff')

>>>>>>> origin/godwin
// using cors 
app.use(cors())


// =========================================================
// === using bodyParser access to req body in post route ===
// =========================================================
<<<<<<< HEAD
app.use(bodyParser.urlencoded({extended: true}))
=======
app.use(bodyParser.urlencoded({ extended: true }))
>>>>>>> origin/godwin
app.use(bodyParser.json())

// =============================================================
// === Printing all request paths and methods for each route ===
// =============================================================
<<<<<<< HEAD
app.use((req, res, next)=>{
=======
app.use((req, res, next) => {
>>>>>>> origin/godwin
    console.log(req.path, req.method)
    next()
})


// ==============================================
// ============== Routes ======================== 
// ==============================================  
app.get('/', (req, res) => {
    res.send('Welcome to Transcript digita api, our team are working around the clock to ensure the ease n requesting, tracking and delivery of transcripts with Nigerian universities, enjoy the process')
})

app.use('/api/v1/alumnus', alumniRoutes)
app.use('/api/v1/institution', institutionRoutes)
app.use('/api/v1/transcript', transcriptRoutes)
<<<<<<< HEAD
=======
    // contact us endpoint
app.use('/api/v1/contact-us', contactUsRoutes)

// staff endpoint
app.use('/api/v1/staff', staffRoutes)
>>>>>>> origin/godwin

// ===========================================
// ============ serving app ==================
// ===========================================
app.listen(process.env.PORT, () => {
    console.log(`Transcript-Digita api serving on port: ${process.env.PORT}`)
})