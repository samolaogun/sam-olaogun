const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');
const room = require('./routes/room');

const dirs = fs.readdirSync('./')
    .filter(dir => fs.lstatSync(path.join(__dirname, dir)).isDirectory());

app.get('/', (req, res) => {
    req.setEncoding('utf-8');
    res.send('Jello');
});

console.log(path.resolve(__dirname, 'room/'));
app.use('/room', room);
// app.use('/room', express.static(path.resolve(__dirname, 'room/')));

app.listen(80);