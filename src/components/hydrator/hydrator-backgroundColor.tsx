'use client';

import { useEffect } from 'react';
import { useBackgroundColorStore } from '@/store/useBackgroundColorStore';

type Props = {
  backgroundColor: string;
};

export default function HydratorBackgroundColor({ backgroundColor }: Props) {
  const setBackgroundColor = useBackgroundColorStore((state) => state.setBackgroundColor);

  useEffect(() => {
    setBackgroundColor(backgroundColor);
  }, [backgroundColor, setBackgroundColor]);

  return null;
}
