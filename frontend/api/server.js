import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { match, buildDFA } from './dfa.js';
import { dfaToDot } from './visual.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Match route
app.post('/match', (req, res) => {
  const { pattern = '', text = '' } = req.body;
  const result = match(pattern.toUpperCase(), text.toUpperCase());
  res.json(result);
});

// DFA DOT route
app.post('/dfa-dot', (req, res) => {
  const { pattern = '' } = req.body;
  const dfaObj = buildDFA(pattern.toUpperCase());
  const dot = dfaToDot(pattern, dfaObj);
  res.type('text/plain').send(dot);
});


export default app;
