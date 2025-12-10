function dfaToDot(pattern, dfaObj) {
  const { dfa, start, accept } = dfaObj;

  const nodes = [];
  for (let s = 0; s < dfa.length; s++) {
    const shape = (s === accept) ? 'doublecircle' : 'circle';
    nodes.push(` q${s} [shape=${shape}, label="q${s}"];`);
  }

  const edges = [];
  for (let s = 0; s < dfa.length; s++) {
    const table = dfa[s];
    const map = {};

    for (const ch in table) {
      const dest = table[ch];
      if (!map[dest]) map[dest] = [];
      map[dest].push(ch);
    }

    for (const dest in map) {
      edges.push(` q${s} -> q${dest} [label="${map[dest].join(',')}"];`);
    }
  }

  return `digraph DFA {
  rankdir=LR;
  node [fontsize=12];
  ${nodes.join('\n ')}
  
  // edges
  ${edges.join('\n ')}
}`;
}

module.exports = { dfaToDot };
