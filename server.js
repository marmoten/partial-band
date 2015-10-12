'use strict';

var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var port = process.env.PORT || 3000;
var Adjective = require('./lib/adjective.js');
//assign Adjective variable name to adjective.js file
var Verb = require('./lib/verb.js');
var Noun = require('./lib/noun.js');
var getRandomWord = require('./lib/getRandomWord.js');
var showAllWords = require('./lib/showAllWords.js');

var adjective = new Adjective();
var verb = new Verb();
var noun = new Noun();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/app/'));
//statically serves the contents of app

function postWord (word, wordObject) {

  if (wordObject.hasOwnProperty(word)) {
    return {msg: 'We already have your awesome word, ' + word + ', in our list.'};
  }

  wordObject[word] = true;
  console.dir(wordObject);
  return {msg: 'Thanks for submitting ' + word + '!'};
};

app.get('/adjective', function(req, res) {
  res.json(getRandomWord(adjective));
});

app.get('/verb', function(req, res) {
  res.json(getRandomWord(verb));
});

app.get('/noun', function(req, res) {
  res.json(getRandomWord(noun));
});

app.get('/allAdjectives', function(req, res) {
  res.json(showAllWords(adjective));
});

app.get('/allVerbs', function(req, res) {
  res.json(showAllWords(verb));
});

app.get('/allNouns', function(req, res) {
  res.json(showAllWords(noun));
});

app.post('/adjective', function(req, res) {
  var word = postWord(req.body.word, adjective);
  res.json(word);
});

app.post('/verb', function(req, res) {
  var word = postWord(req.body.word, verb);
  res.json(word);
});

app.post('/noun', function(req, res) {
  var word = postWord(req.body.word, noun);
  res.json(word);
});

app.get('/', function(req, res) {
  res.sendFile('index.html');
});
//on slash, return index.html file

app.listen(port, function() {
  console.log('server starting. available at http://localhost:' + port);
});

// app.get('/', function(req, res) {
//   res.send('hello, universe');
// });
