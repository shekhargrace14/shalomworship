const SHARP_SCALE = [
  "C", "C#", "D", "D#", "E", "F",
  "F#", "G", "G#", "A", "A#", "B"
];

const FLAT_SCALE = [
  "C", "Db", "D", "Eb", "E", "F",
  "Gb", "G", "Ab", "A", "Bb", "B"
];

const NOTE_TO_INDEX: Record<string, number> = {
  C: 0,

  "C#": 1,
  Db: 1,

  D: 2,

  "D#": 3,
  Eb: 3,

  E: 4,

  F: 5,

  "F#": 6,
  Gb: 6,

  G: 7,

  "G#": 8,
  Ab: 8,

  A: 9,

  "A#": 10,
  Bb: 10,

  B: 11,
};

function prefersFlats(key: string) {
  return key.includes("b");
}

// generateToKey

export function generateToKey(
  fromKey: string,
  shift: number
): string {

  // Handle minor keys
  const match = fromKey.match(
    /^([A-G][#b]?)(m?)$/
  );

  if (!match) {
    throw new Error(`Invalid key: ${fromKey}`);
  }

  const [, root, minor] = match;

  const rootIndex = NOTE_TO_INDEX[root];

  if (rootIndex === undefined) {
    throw new Error(`Invalid key root: ${root}`);
  }

  const newIndex =
    (rootIndex + shift + 12) % 12;

  const scale = prefersFlats(fromKey)
    ? FLAT_SCALE
    : SHARP_SCALE;

  const newRoot = scale[newIndex];

  return minor
    ? `${newRoot}m`
    : newRoot;
}
// transpose

export default function transpose(
  chord: string,
  fromKey: string,
  toKey: string
) {
  // Validate notes
  if (
    NOTE_TO_INDEX[chord] === undefined ||
    NOTE_TO_INDEX[fromKey] === undefined ||
    NOTE_TO_INDEX[toKey] === undefined
  ) {
    return chord;
  }

  const scale = prefersFlats(toKey)
    ? FLAT_SCALE
    : SHARP_SCALE;

  // Get indexes from lookup table
  const fromIndex = NOTE_TO_INDEX[fromKey];
  const toIndex = NOTE_TO_INDEX[toKey];

  // Calculate shift
  const shift = toIndex - fromIndex;

  // Get chord index
  const chordIndex = NOTE_TO_INDEX[chord];

  // Apply shift
  const newIndex = (chordIndex + shift + 12) % 12;

  // Convert index back to note
  const transposedChord = scale[newIndex];

  return transposedChord;
}