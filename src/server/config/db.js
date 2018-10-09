const mongoose = require('mongoose');

const dbURL = 'mongodb://testuser:Ty23aFbud8kbRj@ds227373.mlab.com:27373/wenuwork';

mongoose.connect(dbURL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
