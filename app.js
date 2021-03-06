const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect To Database
mongoose.connect('mongodb://Otto:Bismarck@ds151153.mlab.com:51153/mean-f2b');

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to DB ' + 'mongodb://Otto:Bismarck@ds151153.mlab.com:51153/mean-f2b');
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('DB Error: '+err);
});
//initialize express
const app = express();

const users = require('./routes/users');

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

//add passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//include passport.js file
require('./config/passport')(passport);

app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});
