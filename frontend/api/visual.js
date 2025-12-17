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

export { dfaToDot };
