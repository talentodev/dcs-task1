const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const mapRoutes = require('express-routes-mapper');
const routes = require('./routes');

const port = process.env.PORT || 5000;

const app = express();
const server = http.Server(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', mapRoutes(routes, 'api/'));

server.listen(port);
