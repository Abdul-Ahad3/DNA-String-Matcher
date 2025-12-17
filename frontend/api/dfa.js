const SIGMA = ['A', 'C', 'G', 'T'];

function computeLPS(pattern) {
  const lps = Array(pattern.length).fill(0);
  let len = 0, i = 1;

  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      lps[i++] = ++len;
    } else if (len) {
      len = lps[len - 1];
    } else {
      lps[i++] = 0;
    }
  }
  return lps;
}

function buildDFA(pattern) {
  const lps = computeLPS(pattern);
  const dfa = Array.from({ length: pattern.length + 1 }, () => ({}));

  for (let state = 0; state <= pattern.length; state++) {
    for (let ch of SIGMA) {
      let x = state;
      while (x > 0 && pattern[x] !== ch) x = lps[x - 1];
      if (pattern[x] === ch) x++;
      dfa[state][ch] = x;
    }
  }

  return { dfa, start: 0, accept: pattern.length };
}

function match(pattern, text) {
  if (!pattern) return { match: true, positions: [] };

  const { dfa, accept } = buildDFA(pattern);
  let state = 0;
  const positions = [];

  for (let i = 0; i < text.length; i++) {
    state = dfa[state][text[i]] ?? 0;
    if (state === accept) positions.push(i - accept + 1);
  }

  return { match: positions.length > 0, positions };
}

export { buildDFA, match };
