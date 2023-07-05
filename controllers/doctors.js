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
router.get('/', (req, res) => {
	db.Patient.find({}, { doctors: true, _id: false })
        .then(patients => {
		    // format query results to appear in one array, 
		    // rather than an array of objects containing arrays 
	    	const flatList = []
	    	for (let patient of patients) {
	        	flatList.push(...patient.doctors)
	    	}
	    	res.json(flatList)
		}
	)
});

// New Route: GET localhost:3000/doctors/new
router.get('/new/:patientId', (req, res) => {
    res.send('You\'ve reached the new route. You\'ll be making a new doctor for patient ' + req.params.patientId)
})
// New Route (GET/Read): This route renders a form 
// which the user will fill out to POST (create) a new location
// router.get('/new', (req, res) => {
//     res.send('You\'ve hit the new route!')
// })

// Create Route: POST localhost:3000/doctors/
router.post('/create/:patientId', (req, res) => {
    db.Patient.findByIdAndUpdate(
        req.params.patientId,
        { $push: { doctors: req.body } },
        { new: true }
    )
        .then(patient => res.json(patient))
});
// router.post('/', (req, res) => {
//     db.Doctor.create(req.body)
//         .then(doctor => res.json(doctor))
// })

// Show Route: GET localhost:3000/doctors/:id
router.get('/:id', (req, res) => {
    db.Patient.findOne(
        { 'doctors._id': req.params.id },
        { 'doctors.$': true, _id: false }
    )
        .then(product => {
            // format query results to appear in one object, 
            // rather than an object containing an array of one object
            res.render('doctors/doctor-details', { doc: patient.doctors[0] })
        })
});
// Edit Route (GET/Read): This route renders a form
// the user will use to PUT (edit) properties of an existing pet
router.get('/:id/edit', (req, res) => {
    db.Patient.findOne({ 'doctors._id': req.params.id })
        .then(patient => {
            const doctor = patient.doctors.find(doc => doc._id == req.params.id);
            res.send('You\'ll be editing doctor ' + doctor.name);
        })
});

// Update Route (PUT/Update): This route receives the PUT request sent from the edit route, 
// edits the specified pt document using the form data,
// and redirects the user back to the show page for the updated location.
router.put('/:id', (req, res) => {
    db.Patient.findOneAndUpdate(
      { 'doctors._id': req.params.id },
      { $set: { 'doctors.$': req.body } },
      { new: true }
    )
        .then(patient => res.json(patient.doctors[0]))
})

// Destroy Route: DELETE localhost:3000/doctors/:id
router.delete('/:id', (req, res) => {
    db.Patient.findOneAndUpdate(
        { 'doctors._id': req.params.id },
        { $pull: { doctors: { _id: req.params.id } } },
        { new: true }
    )
        .then(patient => res.json(patient))
});

/* Routes
--------------------------------------------------------------- */
// // Index Route (All doctors): 
// // GET localhost:3000/doctors/
// router.get('/', (req, res) => {
//     db.Patient.find({}, { doctors: true, _id: false })
//         .then(patients => {
//             // format query results to appear in one array, 
//             // rather than an array of objects containing arrays 
//             const flatList = []
//             for (let patient of patients) { flatList.push(...patient.doctors) }
//             res.render('doctors/doctors-index', { docs: flatList })
//         })
// });

// // New Route: GET localhost:3000/doctors/new/:patientId
// router.get('/new/:patientId', (req, res) => {
//     db.Patient.findById(req.params.patientId)
//         .then(patient => {
//             if (patient) {
//                 res.render('doctors/new-form.ejs', { patient: patient })
//             } else {
//                 res.render('404')
//             }
//         })
// })

// // Create Route: POST localhost:3000/doctors/
// router.post('/create/:patientId', (req, res) => {
//     db.Patient.findByIdAndUpdate(
//         req.params.patientId,
//         { $push: { doctors: req.body } },
//         { new: true }
//     )
//         .then(() => res.redirect('/patients/' + req.params.patientId))
// });

// // Show Route: GET localhost:3000/doctors/:id
// router.get('/:id', (req, res) => {
//     db.Patient.findOne(
//         { 'doctors._id': req.params.id },
//         { 'doctors.$': true, _id: false }
//     )
//         .then(patient => {
//             // format query results to appear in one object, 
//             // rather than an object containing an array of one object
//             res.render('doctors/doctors-details', { doc: patient.doctors[0] })
//         })
// });

// // Destroy Route: DELETE localhost:3000/doctors/:id
// router.delete('/:id', (req, res) => {
//     db.Patient.findOneAndUpdate(
//         { 'doctors._id': req.params.id },
//         { $pull: { doctors: { _id: req.params.id } } },
//         { new: true }
//     )
//         .then(patient => res.redirect('/patients/' + patient._id))
// });


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router