const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');

app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

let port = 3001;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.listen(port, ()=> {
    console.log(`Server starts at port ${port}`);
});

app.get('/', function(req, res) {
    res.send('Hello');
})