// require the needed modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = 8000;
const app = express();

app.use(bodyParser.json());
// How you access the form data in the body of express.
app.use(bodyParser.urlencoded({
    extended: true
}));

// Database name
mongoose.connect('mongodb://localhost/Authors');

// Angular express service
app.use(express.static(__dirname + '/public/dist'));
app.use(express.static(path.join(__dirname, '/public/dist')));

// Promises are build into the structure of JS in our Node interprater. Initializing our mongoose promises to be global to be the same when we're using them in express and mongoose servers. Not needed unless you're using promises.
mongoose.Promise = global.Promise;

// Schemas
const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least three characters."]
    }
}, {
    timestamps: true
});

// Schema variable (?)
mongoose.model("Author", AuthorSchema);
const Auth = mongoose.model("Author");

// route for the CRUD opertions.

// index
app.get("/authors", (req, res) => {
    Auth.find({}, (err, author) => {
        if (err) {
            res.json({
                message: "error",
                errors: err
            });
        } else {
            res.json({
                message: "success",
                author: author
            })
        }
    })
})

//create
app.post("/authors", (req, res) => {
    const newAuth = new Auth(req.body);
    newAuth.save((err, author) => {
        if (err) {
            console.log(err);
            res.json({
                message: "error",
                errors: err.errors
            });
        } else {
            console.log(author);
            res.json({
                message: "success",
                author: author
            });
        }
    })
})

// show
app.get("/authors/:id", (req, res) => {
    const id = req.params.id;
    Auth.findOne({
        _id: id
    }, (err, author) => {
        if (err) {
            console.log(err);
            res.json({
                message: "error",
                errors: err.error
            });
        } else {
            console.log(author);
            res.json({
                message: "success",
                author: author
            });
        }
    })
})

// update
app.put("/authors/:id", (req, res) => {
    const id = req.params.id;
    Auth.findById(id, (err, author) => {
        if (err) {
            res.json({
                message: "error",
                errors: err
            });
        } else {
            author.name = req.body.name;
            author.save((err, author) => {
                res.json({
                    message: "success",
                    author: author
                });
            })
        }
    })
})

// delete
app.delete("/authors/:id", (req, res) => {
    const id = req.params.id;
    Auth.deleteOne({
        _id: id
    }, (err) => {
        if (err) {
            res.json({
                message: "error",
                errors: err
            });
        } else {
            res.json({
                message: "success"
            })
        }
    })
})

app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/index.html"));
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})