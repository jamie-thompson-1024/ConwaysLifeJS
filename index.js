
const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.static('dist'));

app.listen(8899);

console.log("Page served at: localhost:8899");
