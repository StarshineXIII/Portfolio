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

mongoose.connect('mongodb://localhost/petShelter');

// Angular express service.. can't decide which one to use.
app.use(express.static(__dirname + '/public/dist'));
app.use(express.static(path.join(__dirname, '/public/dist')));

// Promises are built into the structure of JS in our Node interprater. Initializing our mongoose promises to be global to be the same when we're using them in express and mongoose servers. Not needed unless you're using promises.
mongoose.Promise = global.Promise;

// Schemas

const adoptPetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Your pets name must be at least three characters. "],
        minlength: [3, "Your pets name must be at least three characters."]
    },
    typeOfPet: {
        type: String,
        required: [true, "Pet's type must be at least three characters. "],
        minlength: [3, "Pet's type must be at least three characters."]
    },
    description: {
        type: String,
        required: [true, "Please describe your pet in more than three characters. "],
        minlength: [3, "Please describe your pet in more than three characters."]
    },
    skill_1: {
        type: String,
        // possibly not needed
        required: false,
    },
    skill_2: {
        type: String,
        required: false,
    },
    skill_3: {
        type: String,
        required: false,
    },
    likes: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

mongoose.model("adoptPet", adoptPetSchema);
const adoptPet = mongoose.model("adoptPet");

// route for the CRUD opertions.

// index/root/homepage/displays all pets
app.get("/allpets", (req, res) => {
    adoptPet.find({}, (err, parampet) => {
        if (err) {
            res.json({
                message: "I'm sorry, I couldn't find the pets in the shelter.",
                errors: err
            });
        } else {
            res.json({
                message: "Successfully displaying all available animals for adoption.",
                pet: parampet
            })
        }
    })
})

//create a pet
app.post("/new", (req, res) => {
    const newAdoptPet = new adoptPet(req.body);
    newAdoptPet.save((err, parampet) => {
        if (err) {
            console.log(err);
            let errors = [];
            for (let key in err.errors) {
                errors.push(err.errors[key].message);
            }
            res.json({
                message: "error",
                errors: [errors]
            });
        } else {
            console.log(parampet);
            res.json({
                message: "good",
                pet: parampet
            });
        }
    })
})


// show requested pet
app.get("/details/:id", (req, res) => {
    const id = req.params.id;
    adoptPet.findOne({
        _id: id
    }, (err, parampet) => {
        if (err) {
            console.log(err);
            res.json({
                message: "I'm sorry, I couldn't find the pet you wanted to see.",
                errors: err.error
            });
        } else {
            console.log(parampet);
            res.json({
                message: "Successfully found the pet you were looking for.",
                pet: parampet
            });
        }
    })
})

// edit and update an existing pet
app.put("/edit/:id", (req, res) => {
    const id = req.params.id;
    adoptPet.findById(id, (err, parampet) => {
        if (err) {
            res.json({
                message: "errors",
                errors: [errors]
            });
        } else {
            parampet.name = req.body.name;
            parampet.typeOfPet = req.body.typeOfPet;
            parampet.description = req.body.description;
            parampet.skill_1 = req.body.skill_1;
            parampet.skill_2 = req.body.skill_2;
            parampet.skill_3 = req.body.skill_3;
            parampet.save((err, parampet) => {
                if (err) {
                    console.log(err);
                    let errors = [];
                    for (let key in err.errors) {
                        errors.push(err.errors[key].message);
                    }
                    res.json({
                        message: "errors",
                        errors: [errors]
                    })
                } else {
                    console.log(parampet);
                    res.json({
                        message: "success",
                        pet: parampet
                    })
                }
            })
        }
    })
})


// delete/adopt an existing pet
app.delete("/details/:id", (req, res) => {
    const id = req.params.id;
    adoptPet.deleteOne({
        _id: id
    }, (err) => {
        if (err) {
            res.json({
                message: "I'm sorry, there was an error in the adoption process. Please try again.",
                errors: err
            });
        } else {
            res.json({
                message: "Successfully adopted a pet."
            })
        }
    })
})

// getData() {
//     this.http.get(Globals.baseUrl + 'articles').map(res => res.json()).subscribe(data => {
//         this.results = data;
//     });
// }

//catch all
app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/index.html"));
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})