const express = require('express');
const http = require('http');
const mapRoutes = require('express-routes-mapper');
const routes = require('./routes');
const morgan = require('morgan');

const port = process.env.PORT || 5000;

const app = express();
const server = http.Server(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (err, req, res, next) {
  res.status(500).send('Something broke!');
});
app.use(morgan('combined'));
app.use('/apidoc', express.static(__dirname + '/../../apidoc'));
app.get('/', (req, res) => {
  res.send('It works!');
});
app.use('/', mapRoutes(routes, 'src/application/'));

server.listen(port);
