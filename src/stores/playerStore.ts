import {create} from "zustand"
// import { artists } from "./actions/artists";

interface PlayerState {
    isPlaying : boolean;
    audioUrl : string;
    title : string;
    artist : string;
    image: string;
    setAudio : (url:string, title:string,artist:string,image:string)=> void;                     
    togglePlay : () => void;
    setPlaying : (value: boolean)=>void;
}
export const usePlayerStore = create<PlayerState>((set) => ({
  isPlaying: false,
  audioUrl: "",
  title: "",
  artist: "",
  image: "",
  setAudio: (url, title, artist, image) =>
    set({ audioUrl: url, title, artist,image, isPlaying: true }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setPlaying: (val) => set({ isPlaying: val }),
}));