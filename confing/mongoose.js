// require the library
const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/contact_list_db');

//aquire the connection(to check if it is connection or not)
const db = mongoose.connection;

// error occure
db.on('error', console.error.bind(console, 'error connecting to db'));

//if up and running then print the message
db.once('open', function(){
    console.log('successfully connected the the database');
});