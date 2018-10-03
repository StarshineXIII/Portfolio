const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "/static")));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');


app.get('/', function (req, res) {
    res.render("index");
})









const server = app.listen(8000, function () {
    console.log("listening on port 8000");
});
const io = require('socket.io').listen(server);
// The server and port listener come first, the 'io' variable and require socket statement come second, and the io.sockets.on is last.

// Connection event
io.sockets.on('connection', function (socket) {
    console.log("Client/socket is connected!");
    console.log("Client/socket id is:", socket.id);
    // All of the server socket code goes in here.

    socket.on("button_clicked", function (data) {
        console.log("Someone clicked a button! Reason: " + data.reason);
        socket.emit("server_response", {
            response: "Sockets are the best"
        });
    });
});

//  this is just the configuration code that we've already used
// io.sockets.on( 'connection', function (socket) {
//      EMIT:
//     socket.emit( 'my_emit_event');
//      BROADCAST:
//     socket.broadcast.emit( "my_broadcast_event");
//      FULL BROADCAST:
//     io.emit( "my_full_broadcast_event");
// })