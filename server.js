// Require express module:
const express = require('express');
// Require handlebars module:
const hbs = require('hbs');
// Require path module:
const path = require('path');
// Require filesystem module:
const fs = require('fs');
// Store heroku port for app:
const port = process.env.PORT || 3000;




// Create new Express app:
var app = express();

// Use hbs as default view engine:
app.set('view engine', 'hbs');

// Register partials:
hbs.registerPartials(__dirname + '/views/partials');


/////////////////////////


// MIDDLEWARES //

// Log Request Middleware:
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log("----------------")
  // Display log in console:
  console.log(log);
  // Write to file:
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log("Unable to append to server.log");
    }
  });
  // Continue:
  next();
});

// // Maintenance Middleware:
// app.use((req, res, next) => {
//   res.render('maint.hbs');
// });

// Serve Folder Middleware:
app.use(express.static(__dirname + '/public'));


//////////////////////////


// Register helpers (functions):
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


//////////////////////



// // Serve page using path.join (require path):
// app.get('/help', (req, res) => {
//   // Send html:
//   res.sendFile(path.join(__dirname, '/public', 'help.html'));
// });

////////////////////////
// Registering Handlers
////////////////////////

// // Sending html:
// app.get('/', (req, res) => {
//   // Send html:
//   res.send('<h1 style="color: blue;">Hello Express!</h1>');
// });


// // Sending JSON:
// app.get('/bad', (req, res) => {
//   res.send({
//     errorMessage: 'Unable to fulfill request!'
  // });
// });


///////////////////////


// HBS (Handle Bar Syntax) Templating:
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website!',
    // currentYear: new Date().getFullYear(),
    publisher: 'NewUp Developments'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Me!',
    welcomeMessage: 'Information about me and my servies.',
    // currentYear: new Date().getFullYear(),
    publisher: 'NewUp Developments'
  });
});



// Bind app to local port:
app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
  console.log("----------------")
});

// In terminal: nodemon server.js to start wev-server:



process.on('SIGINT', () => { console.log("Bye bye!"); process.exit(); });
