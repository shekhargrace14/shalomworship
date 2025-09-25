"use client"
import React, { useState } from 'react'
import ChordTable from './ChordTable'
import ChordTableCopy from './ChordTableCopy'

type LinesProps = {
  id: string;
  song: any; // Replace 'any' with the correct type if you have it
  isChords: boolean;
  isTranslations: boolean;
};

const Lines = ({ id, song, isChords, isTranslations }: LinesProps) => {
  const [activeTab, setActiveTab] = useState<"chords" | "nashville" | "lyrics" | "translation">("chords");

  return (
    <>
      <div className="inline-flex gap-4 mb-4">
        {isChords && (
          <div className="inline-flex gap-4">
            {/* Lyrics */}
            <button
              onClick={() => setActiveTab("lyrics")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border border-border cursor-pointer ${activeTab === "lyrics"
                  ? "bg-white text-black"
                  : "bg-background text-foreground hover:bg-white hover:text-black"
                }`}
            >
              Lyrics
            </button>
            {/* Chords */}
            <button
              onClick={() => setActiveTab("chords")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border border-border cursor-pointer ${activeTab === "chords"
                  ? "bg-white text-black"
                  : "bg-background text-foreground hover:bg-white hover:text-black"
                }`}
            >
              Chords
            </button>

            {/* Nashville */}
            <button
              onClick={() => setActiveTab("nashville")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border border-border cursor-pointer ${activeTab === "nashville"
                  ? "bg-white text-black"
                  : "bg-background text-foreground hover:bg-white hover:text-black"
                }`}
            >
              Nashville
            </button>


          </div>
        )}

        {/* Translation */}
        {isTranslations && (
          <button
            onClick={() => setActiveTab("translation")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border border-border cursor-pointer ${activeTab === "translation"
                ? "bg-white text-black"
                : "bg-background text-foreground hover:bg-white hover:text-black"
              }`}
          >
            Translation
          </button>
        )}
      </div>

      {/* Pass flags to ChordTable */}
      {song.isTranslation === null ? (
        <ChordTableCopy
          id={id}
          songData={song}
          isChord={activeTab === "chords" && isChords}
          isNashville={activeTab === "nashville" && isChords}
          isTranslation={activeTab === "translation" && isTranslations}
        />
      ) : (
        <ChordTable id={id} isChord={activeTab==="chords" && isChords===true} songData={song} />
      )}
    </>
  );
};

export default Lines;
