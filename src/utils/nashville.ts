const SHARP_SCALE = [
  "C", "C#", "D", "D#", "E", "F",
  "F#", "G", "G#", "A", "A#", "B"
];

const FLAT_SCALE = [
  "C", "Db", "D", "Eb", "E", "F",
  "Gb", "G", "Ab", "A", "Bb", "B"
];
const NASHVILLE_DEGREES = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
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

const MAJOR_STEPS = [2, 2, 1, 2, 2, 2, 1];

function getScale(key: string): string[] {
  const rootIndex = NOTE_TO_INDEX[key];

  if (rootIndex === undefined) {
    throw new Error(`Invalid key: ${key}`);
  }

  const scale = [key];

  let currentIndex = rootIndex;

  for (const step of MAJOR_STEPS.slice(0, 6)) {
    currentIndex = (currentIndex + step) % 12;
    scale.push(SHARP_SCALE[currentIndex]);
  }

  return scale;
}
function getDegree(
  key: string,
  root: string
): string | null {

  const scale = getScale(key);

  const degreeIndex = scale.indexOf(root);

  if (degreeIndex === -1) {
    return null;
  }

  return NASHVILLE_DEGREES[degreeIndex];
}

function getBassDegree(
  key: string,
  bass?: string
) {

  if (!bass) {
    return "";
  }

  const scale = getScale(key);

  const bassIndex = scale.indexOf(bass);

  if (bassIndex === -1) {
    return "";
  }

  return `/${bassIndex + 1}`;
}
