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

mongoose.connect('mongodb://localhost/deerCRUD');

// Angular express service
app.use(express.static(__dirname + '/public/dist'));
app.use(express.static(path.join(__dirname, '/public/dist')));

// Promises are build into the structure of JS in our Node interprater. Initializing our mongoose promises to be global to be the same when we're using them in express and mongoose servers. Not needed unless you're using promises.
mongoose.Promise = global.Promise;

// Schemas

const DeerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [2, "Name must be at least two characters."]
    },
    age: {
        type: Number,
        required: [true, "Age must be present."]
    },
    gender: {
        type: String,
        required: [true, "Please enter a gender"],
        maxlength: 1
    },
    legs: {
        type: Number,
        default: 4
    }
}, {
    timestamps: true
});

mongoose.model("Deer", DeerSchema);
const Deer = mongoose.model("Deer");

// route for the CRUD opertions.

// index
app.get("/deers", (req, res) => {
    Deer.find({}, (err, deer) => {
        if (err) {
            res.json({
                message: "error",
                errors: err
            });
        } else {
            res.json({
                message: "success",
                deer: deer
            })
        }
    })
})

//create
app.post("/deers", (req, res) => {
    const newDeer = new Deer(req.body);
    newDeer.save((err, deer) => {
        if (err) {
            console.log(err);
            res.json({
                message: "error",
                errors: err.errors
            });
        } else {
            console.log(deer);
            res.json({
                message: "success",
                deer: deer
            });
        }
    })
})

// show
app.get("/deers/:id", (req, res) => {
    const id = req.params.id;
    Deer.findOne({
        _id: id
    }, (err, deer) => {
        if (err) {
            console.log(err);
            res.json({
                message: "error",
                errors: err.error
            });
        } else {
            console.log(deer);
            res.json({
                message: "success",
                deer: deer
            });
        }
    })
})

// update
app.put("/deers/:id", (req, res) => {
    const id = req.params.id;
    Deer.findById(id, (err, deer) => {
        if (err) {
            res.json({
                message: "error",
                errors: err
            });
        } else {
            deer.name = req.body.name;
            deer.age = req.body.age;
            deer.gender = req.body.gender;
            deer.legs = req.body.legs;
            deer.save((err, deer) => {
                res.json({
                    message: "success",
                    deer: deer
                });
            })
        }
    })
})

// delete
app.delete("/deers/:id", (req, res) => {
    const id = req.params.id;
    Deer.deleteOne({
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