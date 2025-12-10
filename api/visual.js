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
// group transitions by destination
const map = {};
for (const ch in table) {
const dest = table[ch];
map[dest] = map[dest] || [];
map[dest].push(ch);
}
for (const dest in map) {
edges.push(` q${s} -> q${dest} [label="${map[dest].join(',')}"];`);
}
}
return `digraph DFA {\n rankdir=LR;\n node [fontsize=12];\n ${nodes.join('\n ')}\n\n // edges\n ${edges.join('\n ')}\n}`;
}


module.exports = { dfaToDot };