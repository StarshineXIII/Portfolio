var express = require('express');

var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(session({
	secret: 'surveyform',
	resave: true,
	saveUninitialized: true
}));

app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');

app.get("/", function (req, res) {
	res.render("index");
});

app.post("/result", function (req, res) {
	req.session.results = req.body;
	console.log(req.session.results);
	res.redirect("/result");
});

//actually ties the results in from the survey form to the results page with the {results:results}, dont forget to define results
app.get("/result", function (req, res) {
	results = req.session.results;
	res.render('result', {
		results: results
	});
});

app.listen(8000, function () {
	console.log("Listening on port 8000");
});


e.stopProppagation();
e.preventDefault();
//....
return false;