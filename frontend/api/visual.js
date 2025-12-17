// api/visual.js

function dfaToDot(pattern, dfaObj) {
  const { dfa, accept } = dfaObj;

  const nodes = dfa.map((_, i) =>
    `q${i} [shape=${i === accept ? 'doublecircle' : 'circle'}];`
  );

  const edges = [];
  dfa.forEach((trans, i) => {
    const grouped = {};
    for (const ch in trans) {
      grouped[trans[ch]] ??= [];
      grouped[trans[ch]].push(ch);
    }
    for (const dest in grouped) {
      edges.push(`q${i} -> q${dest} [label="${grouped[dest].join(',')}"];`);
    }
  });

  return `digraph DFA {
  rankdir=LR;
  ${nodes.join('\n')}
  ${edges.join('\n')}
}`;
}

/* =========================
    VERCEL API HANDLER
   ========================= */
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const { pattern = '', dfaObj } = req.body;

  const dot = dfaToDot(pattern, dfaObj);

  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(dot);
}

export { dfaToDot };
