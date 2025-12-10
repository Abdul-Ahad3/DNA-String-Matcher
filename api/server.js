const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { match, buildDFA } = require('./dfa');
const { dfaToDot } = require('./visual');


const app = express();
app.use(cors());
app.use(bodyParser.json());


app.post('/match', (req, res) => {
const { pattern = '', text = '' } = req.body;
const result = match(pattern.toUpperCase(), text.toUpperCase());
res.json(result);
});


app.post('/dfa-dot', (req, res) => {
const { pattern = '' } = req.body;
const dfaObj = buildDFA(pattern.toUpperCase());
const dot = dfaToDot(pattern, dfaObj);
res.type('text/plain').send(dot);
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server ready on ${PORT}`));