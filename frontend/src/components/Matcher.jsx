import React, { useState } from 'react';
import axios from 'axios';
import Visualizer from './Visualizer';

function Matcher() {
  const [pattern, setPattern] = useState('ACGT');
  const [text, setText] = useState('TTTACGTAAA');
  const [result, setResult] = useState(null);
  const [dot, setDot] = useState('');

  async function handleMatch() {
    try {
      const res = await axios.post('/api/match', { pattern, text });
      setResult(res.data);

      const dotRes = await axios.post('/api/dfa-dot', { pattern });
      setDot(dotRes.data);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      <input value={pattern} onChange={e => setPattern(e.target.value)} />
      <textarea value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleMatch}>Check</button>

      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
      {dot && <Visualizer dot={dot} />}
    </div>
  );
}

export default Matcher;
