// Require the Express Module
const express = require('express');
// Create an Express App
const app = express();
// Require body-parser (to receive post data from clients)
const bodyParser = require('body-parser');
// Require path
const path = require('path');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({
    extended: true
}));
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');

const mongoose = require('mongoose');

// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/basic_mongoose_app1');

const UserSchema = new mongoose.Schema({
    name: String,
    age: Number
})
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'

const User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'User'


// The root route -- we want to get all of the users from the database and then render the index view passing it all of the users
app.get('/', function (req, res) {
    User.find({}, function (err, users) {
        // This is the method that finds all of the users from the database
        // Notice how the first parameter is the options for what to find and the second is the callback function that has an error (if any) and all of the users
        // Keep in mind that everything you want to do AFTER you get the users from the database must happen inside of this callback for it to be synchronous 
        // Make sure you handle the case when there is an error, as well as the case when there is no error
        if (err) {
            console.log("Something went wrong");
        } else {
            console.log(users);
            res.render('index.ejs', {
                user: users
            });
        }
    })
});



// When the user presses the submit button on index.ejs it should send a post request to '/users'.  In
//  this route we should add the user to the database and then redirect to the root route (index view).
app.post('/users', function (req, res) {
    console.log("POST DATA", req.body);
    // This is where we would add the user from req.body to the database.
    let users = new User({
        name: req.body.name,
        age: req.body.age
    });
    users.save(function (err) {
        if (err) {
            console.log("Someting went wrong");
        } else {
            console.log("Successfully added a user!");
            res.redirect('/');
        }
    })
})



// Setting our Server to Listen on Port: 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
})