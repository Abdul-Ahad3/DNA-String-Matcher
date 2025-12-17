import { buildDFA } from './dfa.js';
import { dfaToDot } from './visual.js';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const { pattern = '' } = req.body;

  const dfaObj = buildDFA(pattern.toUpperCase());
  const dot = dfaToDot(pattern, dfaObj);

  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(dot);
}
