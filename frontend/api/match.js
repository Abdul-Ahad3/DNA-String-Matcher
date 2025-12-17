import { match } from './dfa.js';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { pattern = '', text = '' } = req.body;

  const result = match(
    pattern.toUpperCase(),
    text.toUpperCase()
  );

  res.status(200).json(result);
}
