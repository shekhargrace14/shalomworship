// useBackgroundColorStore.ts

import { create } from 'zustand';

interface BackgroundColorStore {
  backgroundColor: any;
  setBackgroundColor: (color: string) => void;
}

export const useBackgroundColorStore = create<BackgroundColorStore>((set) => ({
  backgroundColor: 'red',

  setBackgroundColor: (color) => set({ backgroundColor: color }),
}));
