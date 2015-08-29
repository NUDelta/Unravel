var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');

var app = express();

app.set('port', 3000);

//Only use this for non-production apps
var lessMiddleware = require('less-middleware');
app.use(lessMiddleware(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'chrome-extension')));
app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');
  res.setHeader('Access-Control-Allow-Origin', 'chrome-extension://mnpkfjilckjdlfgggeohheepnlhfnjao');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,json');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  //res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

require('./routes/pages')(app);
require('./routes/services')(app);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});