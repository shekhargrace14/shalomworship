"use client";
import { getKeyByShift, transposeChord } from '@/utils/transpose';
import { Minus, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';

type Chord = {
  chord: string;
  nashville: string;
  space: number;
};

type ChordLyric = {
  label: string;
  chords: Chord[];
  lyrics: { en: string; hi?: string };
  translation: { en: string; hi?: string };
};

type Song = { title?: string; key: string; lines: ChordLyric[][] };

type ChordTableProps = {
  id: string;
  isChord: boolean;
  isTranslation: boolean;
  isNashville: boolean;
  songData?: Song | null;
};

const ChordTable: React.FC<ChordTableProps> = ({ id, isChord, isTranslation, isNashville, songData }) => {
  const [song, setSong] = useState<Song | null>(null);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    async function fetchSong() {
      const singleSong = await songData;

      console.log("singleSong", singleSong);
      // const response = await fetch("/song.json");
      // const singleSong = await response.json();


      if (singleSong) {
        const formattedSong: Song = {
          title: singleSong.title,
          key: singleSong.key || 'C',
          lines: singleSong.lines || []
        };
        setSong(formattedSong);
      }
    }

    fetchSong();
  }, [id]);

  if (!song) return <p>Loading...</p>;

  const fromKey = song.key;
  const toKey = getKeyByShift(fromKey, shift);

  // helper to create spaces
  const addSpaces = (count: number) => '\u00A0'.repeat(count);

  return (
    <div>
      {isChord && (
        <div className="mb-8 flex gap-4 items-center">Transpose:
          <button onClick={() => setShift(shift - 1)} className="px-3 py-1 bg-gray-200 rounded">
            <Plus size={14} />
          </button>
          <span className="text-foreground"> {fromKey} → {toKey}</span>
          <button onClick={() => setShift(shift + 1)} className="px-3 py-1 bg-gray-200 rounded">
            <Minus size={14} />
          </button>
        </div>
      )}

      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-foreground">
        {song.title} {isChord ? "Chords" : "Lyrics"}
      </h2>
      <div className="space-y-6 font-mono">
        {song.lines.map((section, sectionIdx) => (
          <div key={sectionIdx} className="mb-6">
            {section.map((line, lineIdx) => (
              <div key={lineIdx} className="flex flex-col items-start">
                {line.label && <h4 className="font-semibold">{line.label}</h4>}
                {isNashville && line.chords.length > 0 && (
                  <div className="whitespace-pre flex">
                    {line.chords.map((c, i) => (
                      <span key={i} className=" flex">
                          <p className=" min-w-8 block text-blue-600 font-normal ">{c.nashville}</p>
                          {addSpaces(c.space)}
                      </span>
                    ))}
                  </div>
                  )}

                {/* Chords row */}
                {isChord && line.chords.length > 0 && (
                  <div className="whitespace-pre flex">
                    {line.chords.map((c, i) => (
                      <span key={i} className=" flex">
                          <p className=" min-w-8 block text-blue-600 font-normal ">{transposeChord([c.chord], fromKey, toKey)[0]}</p>
                          {addSpaces(c.space)}
                      </span>
                    ))}
                  </div>
                )}

                {/* Lyrics row */}
                <span>{line.lyrics.en}</span>
                {/* <span>{line.lyrics.hi}</span> */}

                {/* Translation */}
                {isTranslation && line.translation?.en && (
                  <span className="text-sm text-muted-foreground">{line.translation.en}</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChordTable;
// const originalChords = section.map(item => item.chord);
// const transposedChords = transposeChord(originalChords, fromKey, toKey);