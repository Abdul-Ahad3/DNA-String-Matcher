import { match, buildDFA } from './dfa.js';
import { dfaToDot } from './visual.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Route selection
  const url = req.url;

  if (url.endsWith('/match')) {
    const { pattern = '', text = '' } = req.body;
    const result = match(pattern.toUpperCase(), text.toUpperCase());
    return res.status(200).json(result);
  }

  if (url.endsWith('/dfa-dot')) {
    const { pattern = '' } = req.body;
    const dfaObj = buildDFA(pattern.toUpperCase());
    const dot = dfaToDot(pattern, dfaObj);
    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send(dot);
  }

  return res.status(404).json({ error: 'Route not found' });
}
