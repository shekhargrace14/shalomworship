export function getTransposeShift(fromKey: string, toKey: string) {
  const fromIndex = NOTE_TO_INDEX[fromKey];
  const toIndex = NOTE_TO_INDEX[toKey];

  if (fromIndex === undefined || toIndex === undefined) {
    throw new Error('Invalid key');
  }

  return toIndex - fromIndex;
}
