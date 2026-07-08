import { useRef } from 'react';

function reorder<T>(list: T[], from: number, to: number): T[] {
  const updated = [...list];
  const [moved] = updated.splice(from, 1);
  updated.splice(to, 0, moved);
  return updated;
}

export function useDragReorder<T>(data: T[], onReorder: (newData: T[]) => void) {
  const dragFrom = useRef<number | null>(null);
  const dragTo = useRef<number | null>(null);

  const onDragStart = (index: number) => {
    dragFrom.current = index;
  };

  const onDragEnter = (index: number) => {
    dragTo.current = index;
  };

  const onDragEnd = () => {
    if (dragFrom.current === null || dragTo.current === null || dragFrom.current === dragTo.current) return;

    const updated = reorder(data, dragFrom.current, dragTo.current);
    onReorder(updated);

    dragFrom.current = null;
    dragTo.current = null;
  };

  return {
    onDragStart,
    onDragEnter,
    onDragEnd,
  };
}
