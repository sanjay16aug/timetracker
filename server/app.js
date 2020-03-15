/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');

// Connect to database
var mongodbURI = 'mongodb://naotimetrack:gmWYFsihKEeskE8sbDn413SzqPzlpp5HbdPQI44UvWZt2A5lFEPaXdBzDgVIdlqUINLHtKPoGtgLA98yIABSXQ==@naotimetrack.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@naotimetrack@';
mongoose.connect(mongodbURI);


// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
var exports = module.exports = app;
