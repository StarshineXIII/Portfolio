const express = require('express');
const session = require('express-session');
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
app.use(session({
    secret: 'surveyform',
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, "/static")));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));






app.get("/", function (req, res) {
    res.render("index");
});


const server = app.listen(8000, function () {
    console.log("Listening on port 8000");
});
const io = require("socket.io").listen(server);

io.sockets.on("connection", function (socket) {
    console.log("Client/socket is connected.");


    socket.on("posting_form", function (data) {
        console.log("Someone submitted this form..");
        socket.emit("updated_message", {
            data: formData,
        })
    });






    socket.on("disconnect", function (socket) {
        console.log("You have disconnected.",
            socket.id);
    });
});