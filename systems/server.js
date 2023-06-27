/* Require modules
--------------------------------------------------------------- */
require('dotenv').config()
const path = require('path');
const express = require('express');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const methodOverride = require('method-override');


/* Require the db connection, models, and seed data
--------------------------------------------------------------- */
const db = require('./models');


/* Require the routes in the controllers folder
--------------------------------------------------------------- */
const patientsCtrl = require('./controllers/patients')
// const adoptionApplicationCtrl = require('./controllers/applications')


/* Create the Express app
--------------------------------------------------------------- */
const app = express();


/* Configure the app (app.set)
--------------------------------------------------------------- */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


/* Middleware (app.use)
--------------------------------------------------------------- */
// Configure the app to refresh the browser when nodemon restarts
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    // wait for nodemon to fully restart before refreshing the page
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

// Body parser: used for POST/PUT/PATCH routes: 
// this will take incoming strings from the body that are URL encoded and parse them 
// into an object that can be accessed in the request parameter as a property called body (req.body).
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(connectLiveReload());
// Allows us to interpret POST requests from the browser as another request type: DELETE, PUT, etc.
app.use(methodOverride('_method'));



/* Mount routes
--------------------------------------------------------------- */
app.get('/', function (req, res) {
    res.send('MediSystemsPro')
});


// When a GET request is sent to `/seed`, the patients collection is seeded
app.get('/seed', function (req, res) {
    // Remove any existing patients
    db.Patient.deleteMany({})
        .then(removedPatients => {
            console.log(`Removed ${removedPatients.deletedCount} patients from the system`)
            // Seed the patient collection with the seed data
            db.Patient.insertMany(db.seedPatients)
                .then(addedPatients => {
                    console.log(`Added ${addedPatients.length} patients to the system`)
                    res.json(addedPatients)
                })
        })
});

// Render the about page
app.get('/about', function (req, res) {
    res.send('about page route')
});


// This tells our app to look at the `controllers/pets.js` file 
// to handle all routes that begin with `localhost:3000/pets`
app.use('/patients', patientsCtrl)

// This tells our app to look at the `controllers/applications.js` file 
// to handle all routes that begin with `localhost:3000/applications`
// app.use('/applications', adoptionApplicationCtrl)


// The "catch-all" route: Runs for any other URL that doesn't match the above routes
app.get('*', function (req, res) {
    res.send('404 Error: Page Not Found')
});



/* Tell the app to listen on the specified port
--------------------------------------------------------------- */
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});