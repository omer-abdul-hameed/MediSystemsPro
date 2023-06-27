/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/patients`
---------------------------------------------------------------------------------------
*/


/* Require modules
--------------------------------------------------------------- */
const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')


/* Routes
--------------------------------------------------------------- */
// Index Route (GET/Read): Will display all patients
router.get('/', function (req, res) {
    db.Patient.find({})
        .then(patients => res.json(patients))
})
// Show Route (GET/Read): Will display an individual patient document
// using the URL parameter (which is the document _id)
router.get('/:id', function (req, res) {
    db.Patient.findById(req.params.id)
        .then(patient => res.json(patient))
        .catch(() => res.send('404 Error: Page Not Found'))
})


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router