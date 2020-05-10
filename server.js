'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');


var urls = {};


var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.DB_URI);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.post("/api/shorturl/new", (req, resp)=>{
  var md5sum = crypto.createHash('md5');
  md5sum.update(req.body.url);
  var hashVal = md5sum.digest('hex');
  urls[hashVal] = req.body.url;
  resp.json({
    "original_url":req.body.url,"short_url":hashVal
  });  
  
});

app.listen('5400', function () {
  console.log('Node.js listening ...');
});