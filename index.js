
const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.static('dist'));

app.listen(3000);

console.log("Page served at: localhost:3000");
