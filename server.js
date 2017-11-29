var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var db = require('./db/data');
var books = require('google-books-search');
var mongo = require('mongodb');


var router = express.Router();
var app = express();



//save data in cookies and use cookie parser with EJS to keep data active for users.
//https://www.npmjs.com/package/google-books-search

//middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())
app.use(require('./routes'));


var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
