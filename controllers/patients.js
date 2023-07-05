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


/* Test Routes
--------------------------------------------------------------- */
// Index Route (GET/Read): Will display all patients
router.get('/', function (req, res) {
    db.Patient.find({})
        .then(patients => {
            res.render('patients/patient-index', {
                patients: patients
            })
        })
})
// New Route (GET/Read): This route renders a form 
// which the user will fill out to POST (create) a new location
router.get('/new', (req, res) => {
    res.render('patients/new-form')
})

// Show Route (GET/Read): Will display an individual patient document
// using the URL parameter (which is the document _id)
router.get('/:id', function (req, res) {
    db.Patient.findById(req.params.id)
        .then(patient => {
            if (patient) {
                res.render('patients/patient-details', { patient: patient })
            }  else {
                res.render('404')
            }
        })
        .catch(() => res.render('404'))
})


// Create Route (POST/Create): This route receives the POST request sent from the new route,
// creates a new patient document using the form data, 
// and redirects the user to the new patient's show page
router.post('/', (req, res) => {
    db.Patient.create(req.body)
        .then(patient => res.redirect('/patients/' + patient._id))
})
// Edit Route (GET/Read): This route renders a form
// the user will use to PUT (edit) properties of an existing patient
router.get('/:id/edit', (req, res) => {
    db.Patient.findById(req.params.id)
        .then(patient => res.render('patients/edit-form', { patient: patient }))
})

// Update Route (PUT/Update): This route receives the PUT request sent from the edit route, 
// edits the specified patient document using the form data,
// and redirects the user back to the show page for the updated location.
router.put('/:id', (req, res) => {
    db.Patient.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(patient => res.redirect('/patients/' + patient._id))
})
// Check-In Route (PUT/Buy): This route receives the PUT request when a user wants to check-in a patient.
// It sets the boolean to true and redirects the user back to the show page for the updated patient.
router.put('/:id/checkin', (req, res) => {
    console.log('checkin route accessed');
    db.Patient.findByIdAndUpdate(
        req.params.id,
        { 
            $set: { checkedIn: true } // Set checkedIn to true
        },
        { new: true }
    )
        .then(patient => {
            console.log('Patient Updated:', patient);
            res.redirect('/patients/' + patient._id);
        })
        .catch(err => {
            console.error('Error updating patient:', err);
            res.render('404');
        });
});
// Checkout Route (PUT/Checkout): This route receives the PUT request when a user wants to checkout a patient.
// It sets the boolean to false and redirects the user back to the show page for the updated patient.
router.put('/:id/checkout', (req, res) => {
    console.log('checkout route accessed');
    db.Patient.findByIdAndUpdate(
        req.params.id,
        { 
            $set: { checkedIn: false } // Set checkedIn to false
        },
        { new: true }
    )
        .then(patient => {
            console.log('Patient Updated:', patient);
            res.redirect('/patients/' + patient._id);
        })
        .catch(err => {
            console.error('Error updating patient:', err);
            res.render('404');
        });
});

// Destroy Route (DELETE/Delete): This route deletes a patient document 
// using the URL parameter (which will always be the patient document's ID)
router.delete('/:id', (req, res) => {
    db.Patient.findByIdAndRemove(req.params.id)
        .then(patient => res.send('You\'ve deleted patient ' + patient.name))
})


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router