const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = 8000;
const app = express();

mongoose.connect('mongodb://localhost/restfulTask')

//angular express service
app.use(express.static(__dirname + '/my-angular-app/dist'));

//json file for API
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const TaskSchema = new mongoose.Schema({
    task: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Task = mongoose.model("tasks", TaskSchema);
module.exports = {
    TaskModel: Task
};


//create 

app.post("/task", function (req, res) {
    Task.create({
        task: req.body.task,
        description: req.body.description
    }, function (err, task) {
        if (err) {
            console.log("Couldn't create new task", err);
            res.json({
                message: "Couldn't create new task",
                error: err
            });
        } else {
            res.json({
                message: "Created new task",
                data: task
            })
        }
    })
})



// Show One

app.get("/task/:id", function (req, res) {
    Task.find({
        _id: req.params.id
    }, function (err, task) {
        if (err) {
            console.log("Couldn't find by ID", err);
            res.json({
                message: "Couldn't find by ID",
                error: err
            });
        } else {
            res.json({
                message: "Found by ID",
                data: task
            })
        }
    })
})


// Show All


app.get("/task", function (req, res) {
    Task.find({}, function (err, task) {
        if (err) {
            console.log("Couldn't show all tasks.", err);
            res.json({
                message: "Couldn't show all tasks.",
                error: err
            });
        } else {
            res.json({
                message: "Showing all tasks",
                data: task
            })
        }
    })
})


// Update


app.put("/task/:id", function (req, res) {
    Task.updateOne({
        _id: req.params.id
    }, req.body, function (err, task) {
        if (err) {
            console.log("Couldn't update by ID", err);
            res.json({
                message: "Couldn't update by ID",
                error: err
            });
        } else {
            res.json({
                message: "Updated by ID",
                data: task
            })
        }
    })
})


// Delete


app.delete("/task/:id", function (req, res) {
    Task.deleteOne({
            _id: req.params.id
        },
        function (err, task) {
            if (err) {
                console.log("Couldn't delete by ID", err);
                res.json({
                    message: "Couldn't delete by ID",
                    error: err
                });
            } else {
                res.json({
                    message: "Deleted by ID",
                    data: task
                })
            }
        })
})


app.listen(PORT, function () {
    console.log(`Port: ${PORT}`);
})