"use client"
import React, { useState } from 'react'
import ChordTable from './ChordTable';
// import ChordTable from '../ChordTable'

const Lines = ({id}:{id:string}) => {
    const [activeTab, setActiveTab] = useState<"chords" | "lyrics">("chords");
  return (
    <>
    <div className="inline-flex p-1 gap-4 mb-8">
      <button
        onClick={() => setActiveTab("chords")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border-1 border-white ${
          activeTab === "chords"
            ? "bg-white text-black"
            : "text-white-500 hover:bg-white hover:text-black"
        }`}
      >
        Chords
      </button>
      <button
        onClick={() => setActiveTab("lyrics")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border-1 border-white ${   
          activeTab === "lyrics"
            ? "bg-white text-black"
            : "text-white-500 hover:bg-white hover:text-black "
        }`}
      >
        Lyrics
      </button>
    </div>
        <div><ChordTable id={id} isChord={activeTab==="chords"}/></div>
    </>
  )
}

export default Lines