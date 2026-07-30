// import { setlist } from "@prisma/client";
import { Setlist } from '@/types/setlist';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SetlistStore {
  channelAllSetlists: Setlist[];
  currentSetlist: Setlist | null;

  setChannelAllSetlists: (setlists: Setlist[]) => void;
  setCurrentSetlist: (setlist: Setlist) => void;

  addSetlist: (setlist: Setlist) => void;
  removeSetlist: (id: string) => void;
  updateSetlist: (setlist: Setlist) => void;
}
export const useSetlistStore = create<SetlistStore>()(
  persist(
    (set) => ({
      channelAllSetlists: [],
      currentSetlist: null,

      setChannelAllSetlists: (setlists) => set({ channelAllSetlists: setlists }),

      setCurrentSetlist: (setlist) => set({ currentSetlist: setlist }),

      addSetlist: (newSetlist) =>
        set((state) => ({
          channelAllSetlists: [newSetlist, ...state.channelAllSetlists],
        })),

      removeSetlist: (id) =>
        set((state) => ({
          channelAllSetlists: state.channelAllSetlists.filter((setlist) => setlist.id !== id),
          currentSetlist: state.currentSetlist?.id === id ? null : state.currentSetlist,
        })),

      updateSetlist: (updatedSetlist) =>
        set((state) => ({
          channelAllSetlists: state.channelAllSetlists.map((setlist) => (setlist.id === updatedSetlist.id ? updatedSetlist : setlist)),
          currentSetlist: state.currentSetlist?.id === updatedSetlist.id ? updatedSetlist : state.currentSetlist,
        })),
    }),
    {
      name: 'setlist-storage-c',

      partialize: (state) => ({
        currentSetlist: state.currentSetlist,
      }),
    },
  ),
);
