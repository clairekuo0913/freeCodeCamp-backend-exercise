require('dotenv').config()
var express = require('express');
var app = express();
var bodyParser = require('body-parser');


const reqLogger = (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next();
} 

app.use(reqLogger);
app.use(bodyParser.urlencoded({extended: false}));
app.use('/public',express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  indexPath = __dirname + '/views/index.html';
  res.sendFile(indexPath);
});

app.get('/json', (req, res) => {
  if (process.env.MESSAGE_STYLE == "uppercase") {
    res.json({"message" : "HELLO JSON"});
  } else {
    res.json({"message": "Hello json"});
  }
});

app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({"time": req.time});
});

app.get('/:word/echo', (req, res) => {
  res.json({"echo": req.params.word});
});

const getName = (req, res) => {
  res.json(req.body);
}

const postName = (req, res) => {
  res.json({"name": `${req.body.first} ${req.body.last}`});
}

app.post('/name', postName);
// app.route('/name').post(postName);

module.exports = app;
