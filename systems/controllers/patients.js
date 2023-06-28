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
// New Route (GET/Read): This route renders a form 
// which the user will fill out to POST (create) a new location
router.get('/new', (req, res) => {
    res.send('You\'ve hit the new route!')
})
// Create Route (POST/Create): This route receives the POST request sent from the new route,
// creates a new patient document using the form data, 
// and redirects the user to the new patient's show page
router.post('/', (req, res) => {
    db.Patient.create(req.body)
        .then(patient => res.json(patient))
})
// Edit Route (GET/Read): This route renders a form
// the user will use to PUT (edit) properties of an existing pet
router.get('/:id/edit', (req, res) => {
    db.Patient.findById(req.params.id)
        .then(patient => res.send('You\'ll be editing patient ' + patient.name))
})
// Update Route (PUT/Update): This route receives the PUT request sent from the edit route, 
// edits the specified pet document using the form data,
// and redirects the user back to the show page for the updated location.
router.put('/:id', (req, res) => {
    db.Patient.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(patient => res.json(patient))
})
// Destroy Route (DELETE/Delete): This route deletes a pet document 
// using the URL parameter (which will always be the pet document's ID)
router.delete('/:id', (req, res) => {
    db.Patient.findByIdAndRemove(req.params.id)
        .then(patient => res.send('You\'ve deleted patient ' + patient.name))
})


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router