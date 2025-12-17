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
      console.log(res.data)
      setDot(dotRes.data);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      <label> DNA 1 : </label>
      <input value={pattern} onChange={e => setPattern(e.target.value)} />
      <label> DNA 2 : </label>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleMatch}>Check</button>
      
      {result && <pre> match : {result.match === true ? "DNA Sequence is matched" : "DNA Sequence is not matched"}</pre> && 
      <pre>{result.positions[0] ? <span>Position of existence of DNA 1 is {result.positions[0] + 1}</span> : ""}</pre>}
      {dot && <Visualizer dot={dot} />}
    </div>
  );
}

export default Matcher;
