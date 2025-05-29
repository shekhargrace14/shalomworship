// utils/transpose.js

const MAJOR_SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function getKeyByShift(key, shift) {
  const index = MAJOR_SCALE.indexOf(key);
  if (index === -1) throw new Error('Invalid key: ' + key);
  const newIndex = (index + shift + MAJOR_SCALE.length) % MAJOR_SCALE.length;
  return MAJOR_SCALE[newIndex];
}

function getScale(key) {
  const majorSteps = [2, 2, 1, 2, 2, 2, 1]; // W W H W W W H
  const startIndex = MAJOR_SCALE.indexOf(key);
  if (startIndex === -1) throw new Error("Invalid key: " + key);

  const scale = [MAJOR_SCALE[startIndex]];
  let index = startIndex;
  for (let step of majorSteps) {
    index = (index + step) % 12;
    scale.push(MAJOR_SCALE[index]);
  }
  return scale.slice(0, 7); // return 7-note scale
}

function normalizeChord(chord) {
  const clean = chord.trim().replace(/\s+/g, '');
  const match = clean.match(/^([A-G][#b]?)(.*?)(?:\/([A-G][#b]?))?$/);
  if (!match) throw new Error("Invalid chord: " + chord);

  const [, root, suffix, bass] = match;
  return [root, suffix, bass]; // root, suffix, optional bass
}

function transposeChord(chords, fromKey, toKey) {
  const fromScale = getScale(fromKey);
  const toScale = getScale(toKey);

  return chords.map((chord) => {
    const [root, suffix, bass] = normalizeChord(chord);

    const rootIndex = fromScale.indexOf(root);
    const transposedRoot = rootIndex !== -1 ? toScale[rootIndex] : root;

    let transposedBass = bass;
    if (bass) {
      const bassIndex = fromScale.indexOf(bass);
      transposedBass = bassIndex !== -1 ? toScale[bassIndex] : bass;
    }

    return transposedBass
      ? `${transposedRoot}${suffix}/${transposedBass}`
      : `${transposedRoot}${suffix}`;
  });
}

export { MAJOR_SCALE, getKeyByShift, transposeChord };
