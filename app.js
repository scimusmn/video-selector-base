const express = require('express');
const http = require('http');
const app = express();

app.use(express.static(__dirname + '/public'));

http.createServer(app).listen(3000);
