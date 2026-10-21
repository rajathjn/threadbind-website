// The demo loom, copied from Weave's Cozy loom screen (weave 4). '' is a removed cell.
export const LOOM = [
  ['S', 'T', 'H', 'R', 'O', 'N'],
  ['L', 'A', 'E', 'E', 'P', 'G'],
  ['M', 'N', 'A', 'A', 'D', 'I'],
  ['C', 'O', 'R', '', 'S', 'L'],
  ['K', 'U', 'I', 'E', 'N', 'B'],
  ['F', 'W', 'O', 'D', 'Y', 'V'],
];

// Weave's frozen letter values (design.md §4.2).
export const LETTER_VALUES = Object.fromEntries(
  Object.entries({ 1: 'AEIS', 2: 'CDLNORTU', 3: 'BFGHKMPY', 4: 'VW', 5: 'JXZ', 6: 'Q' })
    .flatMap(([v, letters]) => [...letters].map((l) => [l, Number(v)])),
);
