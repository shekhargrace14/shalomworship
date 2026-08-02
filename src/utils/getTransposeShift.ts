import { NOTE_TO_INDEX } from './transpose';

export function getTransposeShift(fromKey: string, toKey: string) {
  const fk = fromKey.replace(/m$/, '');
  const tk = toKey.replace(/m$/, '');
  const fromIndex = NOTE_TO_INDEX[fk];
  const toIndex = NOTE_TO_INDEX[tk];

  if (fromIndex === undefined || toIndex === undefined) {
    throw new Error('Invalid key');
  }

  return toIndex - fromIndex;
}
