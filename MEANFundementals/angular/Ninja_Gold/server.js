// --------------- Import Modules --------------- //
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
let session = require('express-session');
const app = express();

// --------------- Guidelines --------------- //
app.use(express.static(path.join(__dirname, '/ninja-gold/dist')));
app.use(bodyParser.json());

// --------------- Routing --------------- //
app.get('/ninjagold', function(req, res) {
    if(! session.totalGold) {
        session.totalGold = 0;
    }
    if(! session.activity) {
        session.activity = [];
    }
    res.json({gold: session.totalGold, activity: session.activity});
})

app.put('/ninjagold', function(req, res) {
    let earned = 0;
    if (req.body.id == 1) {
        earned = Math.floor(Math.random() * 4) + 2;
        session.activity.push('You earned ' + earned + ' gold from the Farm.');
    } else if (req.body.id == 2) {
        earned = Math.floor(Math.random() * 6) + 5;
        session.activity.push('You earned ' + earned + ' gold from the Cave.');
    } else if (req.body.id == 3) {
        earned = Math.floor(Math.random() * 9) + 7;
        session.activity.push('You earned ' + earned + ' gold from the House.');
    } else if (req.body.id == 4) {
        earned = Math.floor(Math.random() * 201) - 100;
        session.activity.push('You earned ' + earned + ' gold from the Casino.');
    }
    session.totalGold += earned;
    res.json({gold: session.totalGold, activity: session.activity});
})

app.get('/reset', function(req, res) {
    session.totalGold = 0;
    session.activity = [];
    res.redirect('/');
})

// --------------- Run Server --------------- //
app.listen(8000, function() {
    console.log('listening...');
})
