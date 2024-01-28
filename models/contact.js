const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;


// The first argument to "mongoose.model" is the name of the model ('Contact' in this case), 
// and the second argument is the schema that defines the structure of the documents for this model.

// The schema specifies the structure of contact documents, 
// and the model provides an interface for interacting with the database.