/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/doctors`
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
// Index Route (All doctors): 
// GET localhost:3000/doctors/
router.get('/', function (req, res) {
    db.Doctor.find({})
        // .then(doctors => res.json(doctors))
    .then(doctors => {
        res.render('doctors/doctors-index', {
            doctors: doctors
        })
    })
})

// New Route: GET localhost:3000/doctors/new
// New Route (GET/Read): This route renders a form 
// which the user will fill out to POST (create) a new location
router.get('/new', (req, res) => {
    // res.send('You\'ve hit the new route!')
    res.render('doctors/new-form')
})
// Show Route (GET/Read): Will display an individual doctor document
// using the URL parameter (which is the document _id)
router.get('/:id', function (req, res) {
    db.Doctor.findById(req.params.id)
        // .then(doctor => res.json(doctor))
        // .catch(() => res.send('404 Errsor: Page Not Found'))
        .then(doctor => {
            if (doctor) {
                res.render('doctors/doctors-details', { doctor: doctor })
            } else {
                res.render('404')
            }
        })
        .catch(() => res.render('404'))
})
// Create Route: POST localhost:3000/doctors/
// Creates a new doctor document using the form data, 
// And redirects the user to the new doctor's show page
router.post('/', (req, res) => {
    db.Doctor.create(req.body)
        // .then(doctor => res.json(doctor))
        .then(doctor => res.redirect('/doctors/' + doctor._id))
})

// Edit Route (GET/Read): This route renders a form
// the user will use to PUT (edit) properties of an existing doctor
router.get('/:id/edit', (req, res) => {
    db.Doctor.findById(req.params.id)
        // .then(doctor => res.send('You\'ll be editing doctor ' + doctor.name))
        .then(doctor => res.render('doctors/edit-form', { doctor: doctor }))
})

// Update Route (PUT/Update): This route receives the PUT request sent from the edit route, 
// edits the specified doctor document using the form data,
// and redirects the user back to the show page for the updated location.
router.put('/:id', (req, res) => {
    db.Doctor.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        // .then(doctor => res.json(doctor))
    .then(doctor => res.redirect('/doctors/' + doctor._id))
})
// Available Route (PUT): This route receives the PUT request when a user wants to make a doctor available.
// It sets the boolean to true and redirects the user back to the show page for the updated doctor.
router.put('/:id/available', (req, res) => {
    console.log('available route accessed');
    db.Doctor.findByIdAndUpdate(
        req.params.id,
        { 
            $set: { availability: true } // Set checkedIn to true
        },
        { new: true }
    )
        .then(doctor => {
            console.log('Doctor Updated:', doctor);
            res.redirect('/doctors/' + doctor._id);
        })
        .catch(err => {
            console.error('Error updating Doctor:', err);
            res.render('404');
        });
});
// Unavailable Route (PUT): This route receives the PUT request when a user wants to make a doctor unavailable.
// It sets the boolean to false and redirects the user back to the show page for the updated doctor.
router.put('/:id/unavailable', (req, res) => {
    console.log('unavailable route accessed');
    db.Doctor.findByIdAndUpdate(
        req.params.id,
        { 
            $set: { availability: false } // Set availability to false
        },
        { new: true }
    )
        .then(doctor => {
            console.log('Doctor Updated:', doctor);
            res.redirect('/doctors/' + doctor._id);
        })
        .catch(err => {
            console.error('Error updating Doctor:', err);
            res.render('404');
        });
});

// Destroy Route (DELETE/Delete): This route deletes a doctor document 
// using the URL parameter (which will always be the doctor document's ID)
router.delete('/:id', (req, res) => {
    db.Doctor.findByIdAndRemove(req.params.id)
        // .then(doctor => res.send('You\'ve deleted doctor ' + doctor._id))
        .then(() => res.redirect('/doctors'))
})

/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router