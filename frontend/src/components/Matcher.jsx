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
      const res = await axios.post('/api/server/match', { pattern, text });
      setResult(res.data);

      const dfaRes = await axios.post('/api/server/dfa-dot', { pattern });
      setDot(dfaRes.data);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="matcher">
      <div className="inputs">
        <label>Pattern (P):</label>
        <input value={pattern} onChange={e => setPattern(e.target.value)} />

        <label>Text (T):</label>
        <textarea value={text} onChange={e => setText(e.target.value)} />

        <button onClick={handleMatch}>Check Match</button>
      </div>

      {result && (
        <div>
          <p>Match: {result.match ? 'Yes' : 'No'}</p>
          <p>Positions: {JSON.stringify(result.positions)}</p>
        </div>
      )}

      {dot && <Visualizer dot={dot} />}
    </div>
  );
}

export default Matcher;
