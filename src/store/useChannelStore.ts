import { channel } from '@prisma/client';
import { create } from 'zustand';

interface ChannelStore {
  channels: channel[];
  currentChannel: channel | null;

  setChannels: (channels: channel[]) => void;
  setCurrentChannel: (channel: channel | null) => void;
}

export const useChannelStore = create<ChannelStore>((set) => ({
  channels: [],
  currentChannel: null,

  setChannels: (channels) => set({ channels }),
  setCurrentChannel: (currentChannel) => set({ currentChannel }),
}));
