"use client"
import React, { useState } from 'react'
import ChordTable from './ChordTable';
// import ChordTable from '../ChordTable'

type LinesProps = {
  id: string;
  song: any; // Replace 'any' with the correct type if you have it
  isChords: boolean;
};

const Lines = ({id ,song, isChords}: LinesProps) => {
  // console.log(isChords,"ischords on line page")
    const [activeTab, setActiveTab] = useState<"chords" | "lyrics">("chords");
    // console.log("song", song)
  return (
    <> {
      isChords ? 
      
      
    <div className="inline-flex p-1 gap-4 mb-8">
      <button
        onClick={() => setActiveTab("chords")}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border-1 border-border cursor-pointer ${
          activeTab === "chords"
            ? "bg-white text-black"
            : "bg-background text-foreground hover:bg-white hover:text-black"
        }`}
      >
        Chords
      </button>
      <button
        onClick={() => setActiveTab("lyrics")}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border-1 border-border cursor-pointer ${   
          activeTab === "lyrics"
            ? "bg-white text-black"
            : "text-foreground text-foreground hover:bg-white hover:text-black "
        }`}
      >
        Lyrics
      </button>
    </div>
      :""}

        <div><ChordTable id={id} isChord={activeTab==="chords" && isChords===true} songData={song} /></div>
    </>
  )
}

export default Lines