const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(session({
    secret: 'surveyform',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, "/static")));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');


// -----------


app.get('/', function (req, res) {
    res.render('index', {
        title: "my Express project"
    });
});

app.post('/users', function (req, res) {
    //code to add user to db goes here!
    req.session.name = req.body.name;
    console.log(req.session.name);
    // console.log("POST DATA /n/n", req.body);
    res.redirect('/');
});

app.get("/users/:id", function (req, res) {
    // just to illustrate that req.params is usable here:
    console.log("The user id requested is: ", req.params.id);
    // code to get user from db goes here, etc...
    res.send("You requested the user with the id: " + req.params.id);
});

app.listen(8000, function () {});