// DFA built from pattern using KMP prefix logic
const SIGMA = ['A','C','G','T'];


function computeLPS(pattern) {
const m = pattern.length;
const lps = Array(m).fill(0);
let len = 0, i = 1;
while (i < m) {
if (pattern[i] === pattern[len]) {
len++; lps[i] = len; i++;
} else if (len > 0) {
len = lps[len-1];
} else { lps[i] = 0; i++; }
}
return lps;
}


function buildDFA(pattern) {
const m = pattern.length;
const lps = computeLPS(pattern);
// dfa[state][ch] = nextState
const dfa = Array.from({length: m+1}, () => ({}));
for (let state = 0; state <= m; state++) {
for (let ch of SIGMA) {
let x = state;
while (x > 0 && pattern[x] !== ch) x = lps[x-1];
if (pattern[x] === ch) x++;
dfa[state][ch] = x;
}
}
return { dfa, start: 0, accept: m };
}


function match(pattern, text) {
if (!pattern || pattern.length === 0) {
return { match: true, positions: [] };
}
const { dfa, start, accept } = buildDFA(pattern);
let state = start;
const positions = [];
for (let i = 0; i < text.length; i++) {
const ch = text[i];
if (!dfa[state][ch] && !SIGMA.includes(ch)) {
// invalid character: reset state
state = 0; continue;
}
state = dfa[state][ch];
if (state === accept) positions.push(i - accept + 1);
}
return { match: positions.length > 0, positions };
}


module.exports = { buildDFA, match };