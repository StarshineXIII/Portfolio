const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = 8000;
const app = express();
app.set('views', path.join(__dirname, '/views'))
app.set('view_engine', 'ejs');

mongoose.connect('mongodb://localhost/quotingDojo')
const QuoteSchema = new mongoose.Schema({
    name: String,
    quote: String
}, {
    timestamps: true
});
//collection
mongoose.model('Quote', QuoteSchema);
// expose the schema to the scope of page
// retrieving this Schema from our Models, named 'User'
const Quote = mongoose.model('Quote');

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({
    extended: true
}));

//-----------------------         ------------------------------

app.get('/', function (req, res) {
    res.render('index.ejs');
    // console.log('this in a callback function', this);
})

app.get('/quotes', function (req, res) {
    Quote.find(function ({}, err, quotes) {
        if (err) {
            console.log("Someting went wrong");
        } else {
            res.render('quotes'), {
                all_quotes: quotes
            }
        }
    });
})

app.post('/quotes', (req, res) => {
    // console.log('this is an arrow function', this);
    //create the quote
    let quote = new Quote({
        name: req.body.name,
        quote: req.body.quote
    })
    console.log(quote);
    quote.save(function (err) {
        if (err) {
            console.log("Someting went wrong");
        } else {
            console.log("Successfully added a quote!");
            res.redirect('/quotes');
        }
    })
});

app.listen(PORT, function () {
    console.log(`Port: ${PORT}`);
})

// Sorting method
// Quote.find({}).sort('-createdAt').exec(function(err, quotes){
//     // if/else statements.
// })

// Date formatting-
// Mongoose date format sucks, use JavaScript object date formatting.