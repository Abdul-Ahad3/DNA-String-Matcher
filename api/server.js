const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { match, buildDFA } = require('./dfa');
const { dfaToDot } = require('./visual');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Route: match DNA strings
app.post('/match', (req, res) => {
  const { pattern = '', text = '' } = req.body;
  const result = match(pattern.toUpperCase(), text.toUpperCase());
  res.json(result);
});

// Route: return DOT format of DFA
app.post('/dfa-dot', (req, res) => {
  const { pattern = '' } = req.body;
  const dfaObj = buildDFA(pattern.toUpperCase());
  const dot = dfaToDot(pattern, dfaObj);
  res.type('text/plain').send(dot);
});


module.exports = app;
