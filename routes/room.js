const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../views'));

app.get('/', (req, res) => {
    const rooms = fs.readdirSync('public/room/')
        .filter(room => !room.startsWith('.'))
        .filter(room => fs.lstatSync(path.join(__dirname, '../public/room/', room)).isDirectory());

    res.render('rooms', {
        rooms: rooms
    });
});

app.get('/:room', (req, res) => {
    const params = req.params;
    const room = params.room;

    const rooms = fs.readdirSync('public/room/');
    const hasRoom = rooms.filter(item => item == room)[0];

    hasRoom ?
        res.render('default', {
            title: room,
            body: fs.readFileSync(path.resolve(`public/room-bin/${room}/${room}.html`)).toString()
        }) :
        res.sendFile(path.resolve('public/404.html'));
});

module.exports = app;