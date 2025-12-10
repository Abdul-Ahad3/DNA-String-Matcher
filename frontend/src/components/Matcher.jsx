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
const resp = await axios.post('http://localhost:4000/match', { pattern, text });
setResult(resp.data);
const dfaResp = await axios.post('http://localhost:4000/dfa-dot', { pattern });
setDot(dfaResp.data);
} catch (err) {
alert(err.message);
}
}


return (
<div className="matcher">
<div className="inputs">
<label>Pattern (P):</label>
<input value={pattern} onChange={e => setPattern(e.target.value.toUpperCase())} />
<label>Text (T):</label>
<textarea value={text} onChange={e => setText(e.target.value.toUpperCase())} rows={4} />
<button onClick={handleMatch}>Check Match</button>
</div>


<div className="results">
{result && (
<div>
<p>Match: {result.match ? 'Yes' : 'No'}</p>
<p>Positions: {JSON.stringify(result.positions)}</p>
</div>
)}


{dot && <Visualizer dot={dot} />}
</div>
</div>
);
}

export default Matcher;