const express = require('express');
const port = process.env.PORT || 5000;
const app = express();

app.set('view engine', 'ejs');// setting view-engine as ejs template
const path = require('path'); // importing path library
app.set('views', path.join(__dirname, 'views'));// telling to express about views directory and it's  path.

const Contact = require('./models/contact'); //
const db = require('./confing/mongoose'); // establish connection b/w database and server


app.use(express.urlencoded());//it's a middle-ware, it is used for only FORM data encoding the data in key value pair that browser has sended to the router.
app.use(express.static('assets')); // it's a middle-ware to access assets folder for beutyfy html, css js, and images files.

//Custom middle-ware, it can be multiple, and it can manipulate the data comming from browser and then sent it to the server/router
// app.use(function(req, res, next){ //middle-ware 1
//     console.log('middle-ware 1 called!');
//     next();
// });
// app.use(function(req, res, next){ //middle-ware 2       
//     console.log('middle-ware 2 claaed!');
//     next();
// })

// const contactList = [
//     {
//         name: "Ravindra",
//         phone: "1234567890"
//     },
//     {
//         name: "Tony Stark",
//         phone: "9865851452"
//     },
//     {
//         name: "Iron Man",
//         phone: "7855223690"
//     }
// ]

// ROUT=='/' part and CONTROLLERS== function(){} part ------rendering part on browser through puting data in view-engine templates.
app.get('/', async function(req, res){
    try {
        const contacts = await Contact.find({}); // {type in curly braces like key:'value' for filter the data}
        res.render('home', {
            title: 'Contact List',
            contact_list: contacts
        });
    } catch (err) {
        console.log('error in fetching contacts from db:', err);
        return;
    }
    
});


app.get('/practice',  function(req, res){  
    try { 
        return res.render('practice', {title: "Flying"});

    } catch (err) {
        return;
    }
    
 });

// this work as a ROUTER that catching the data from browser and sending data to the controller.
// data will catched in req as a object.
 app.post('/create-contact', async function(req, res) {
    try {
        const newContact = await Contact.create({
            name: req.body.name,
            phone: req.body.phone
        });
        
        return res.redirect('back'); // for staying on the current page after clicking the 'Add Contact' button
    } catch (err) {
        console.log('error in creating a contact:', err);
        return;
    }
    
});



//  for deleting a contact
app.get('/delete-contact/:id', async function(req, res){
    
    try {
        //get the id from query in the parameter
        let id = req.params.id;
        
        //find the contact in the database using id and delete it.
        await Contact.findByIdAndDelete(id);
        
        return res.redirect('back');
    } catch (err) {
        console.log('error in deleting the contact from the database:', err);
        return;
    }
    
});


// -----------------------------error handle
app.listen(port, function(err){
    if(err){
        console.log('Error in running the server', err);
    }

    console.log('Yup!My express server running on port', port);
});