"use client";
import { getLanguageName } from '@/utils/getLanguageName';
import transpose, { generateToKey } from '@/utils/transpose';
import { ChevronRight, Minus, Plus } from 'lucide-react';
import React, { useState } from 'react';

type ChordItem = {
  id: number;
  root: string;
  number: number | string;
  quality: string;
  position: number;
  nashville: number;
  bass: string;
};

type LineItem = {
  id: number;
  indent: number;
  sectionBreak: boolean;
  lyrics: { english: string; native: string; translation: string; };
  chords: ChordItem[];
};

type SectionItem = {
  id: number;
  type: string;
  label: string;
  repeat: number;
  lines: LineItem[];
  sectionTranspose: boolean;
  step: number;
};

type Song = {
  id: string;
  title?: string;
  key: string;
  language?: string;
  lyrics: {
    arrangement: SectionItem[]; // Fixed spelling and structural mapping matching your JSON
  }
};

type ChordTableProps = {
  isChord: boolean;
  isTranslation: boolean;
  isNashville: boolean;
  songData?: Song | null;
  Songlanguage?: any;
};

const ChordTableVersion4: React.FC<ChordTableProps> = ({ isChord, isTranslation, isNashville, songData, Songlanguage }) => {
  // console.log(songData, "song")

  const [shift, setShift] = useState(0);

  if (!songData) return <p>Loading...</p>;

  const fromKey = songData.key || 'C';
  const toKey = generateToKey(fromKey, shift);
  const langName = getLanguageName(Songlanguage);
  const isHindi = songData.language === "hi";


  const position = (count: number) => '\u00A0'.repeat(count);

  const renderLineWithChords = (line: LineItem) => {
    const lyrics = line.lyrics?.english || "";
    const chars = lyrics.split("");

    return (
      <div className="mt-4">
        <div
          className="flex flex-wrap font-mono relative"
          style={{
            marginLeft: `${line.indent || 0}px`,
            // Height buffer ensures absolute chords don't clip into the row above
            lineHeight: "2.5rem",
          }}
        >
          {chars.map((char, index) => {
            // Scan array indices to match exact chord assignment position
            const chord = line.chords.find((c) => c.position === index);
            // console.log(chord)

            return (
              <div
                key={index}
                className="relative inline-flex flex-col items-center min-w-[0.6em]"
              >
                {/* Chord Layer: Extracted and floating above the core letter cell */}
                {chord && (
                  <div
                    className="absolute bottom-[1.4rem] left-0 text-accent font-semibold whitespace-nowrap select-none pointer-events-none z-10"
                    style={{ transform: "translateX(0%)" }}
                  >
                    {isNashville ? (
                      // 1. NASHVILLE MODE: Degree number handles quality natively.
                      <>
                        {chord.nashville}
                        {/* If a bass note exists, map it to its Nashville degree number */}
                        {/* {chord.bassNumber && `/${chord.bassNumber}`} */}
                      </>
                    ) : (
                      // 2. STANDARD MODE: Transpose standard chord roots and qualities
                      <>
                        {transpose(chord.root, fromKey, toKey)}
                        {chord.quality !== "major" && chord.quality}
                        {chord.bass && `/${transpose(chord.bass, fromKey, toKey)}`}
                      </>
                    )}
                  </div>
                )}

                {/* Character Layer: Native character text track cells */}
                <div className="whitespace-pre text-foreground ">
                  <p className='text-sans'>

                    {char === " " ? "\u00A0" : char}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>

      {/* Transpose Button */}
      {isChord && (
        <div className="mb-8 flex gap-4 items-center">Transpose:
          <button onClick={() => setShift(shift - 1)} className="px-3 py-1 bg-background text-foreground rounded border border-border cursor-pointer">
            <Minus size={14} />
          </button>
          <span className="text-foreground flex items-center">{fromKey} <ChevronRight size={18} /> {toKey}</span>
          <button onClick={() => setShift(shift + 1)} className="px-3 py-1 bg-background text-foreground rounded border border-border cursor-pointer">
            <Plus size={14} />
          </button>
        </div>
      )}
      {/* Main*/}
      <main className={`space-y-6 ${!isChord && !isNashville && isHindi ? "grid grid-cols-1 lg:grid-cols-2 gap-4" : "block"} items-start`}>

        {/* left - romans  */}
        <div className="">
          {songData?.lyrics?.arrangement?.map((section) => (
            
            <div key={section.id} className="left mb-6 block border-l-2 border-muted pl-4 rounded-md py-2">

              {/* Section Header */}
              <h4 className="font-semibold font-mono text-md text-muted-foreground flex items-center gap-2 mb-3 uppercase tracking-wide">
                <span>{section.label && section.label.trim() !== "" ? section.label : section.type}</span>
                {section.repeat > 1 && (
                  <span className="text-xs font-bold bg-accent/20 text-accent px-1.5 py-0.5 rounded">
                    x{section.repeat}
                  </span>
                )}
                <span className='text-sm font-mono capitalize text-muted-foreground'>
                  {section.sectionTranspose
                    ? (
                      `(Transpose ${section.step > 0
                        ? `+${section.step}`
                        : `${section.step}`})`
                    )
                    : ""
                  }
                </span>
              </h4>

              {/*LinesLoop inside Section */}
              {section.lines?.length === 0 ? (
                <div className="text-xs text-muted-foreground/60 italic p-1">Empty Section</div>
              ) : (
                section.lines?.map((line) => (
                  <div key={line.id} className="mt-1">
                    {/* NASHVILLE */}
                    {/* {isNashville && (
                      <div className="flex flex-row">
                        {line.chords.map((item, i) => (
                          <span key={i} className="flex">
                            <div className="min-w-8 text-sm " style={{ marginLeft: `${item.position}px` }}>
                              <div className=" bg-card text-foreground font-medium inline-flex items-start p-0.5 px-1 rounded">
                                <div className="w-fit text-accent">
                                  {item.nashville}
                                </div>
                                <p className="text-xs text-accent">
                                  {item.quality !== "major" &&
                                    item.quality
                                  }
                                </p>
                              </div>
                            </div>
                          </span>
                        ))}
                      </div>
                    )} */}
                    {/* CHORDS */}
                    {((isChord || isNashville) && renderLineWithChords(line))}
                    {/* LYRICS */}
                    {!isChord && !isNashville &&
                      <div
                        className="flex flex-row"
                        style={
                          isChord || isNashville
                            ? { marginLeft: `${line.indent}px` }
                            : undefined
                        }
                      >
                        <p className='text-base font-inter '>
                          {line.lyrics.english}
                        </p>
                        {/* {line.sectionBreak&& (
                          "brekkkkkkkkkkkkkk"
                        )} */}
                      </div>
                    }
                    {/* TRANSLATION */}

                    {isTranslation && line.lyrics?.translation && (
                      <span className="text-sm text-muted-foreground block ">{line.lyrics.translation}</span>
                    )}
                    {line.sectionBreak && "\u00A0"}

                  </div>
                ))
              )}
            </div>
            
          ))}
        </div>

        {/* right - native */}
        {!isChord && !isNashville && isHindi && (
          <div className="right">

            {/* mobile H2 for non-romans languages */}
            <h2 className="block lg:hidden text-xl md:text-2xl font-semibold mb-0 text-foreground">
              {songData.title}{" "}{langName} Lyrics
            </h2>

            {/* Fixed mapping to safely loop through the structural arrangement array */}
            {songData?.lyrics?.arrangement?.map((section) => (
              <div key={`native-${section.id}`} className="mb-6 block border-l-2 border-muted pl-3 rounded-md py-2">

                {/* Section Header */}
                <h4 className="font-semibold font-mono text-md text-muted-foreground flex items-center gap-2 mb-3 uppercase tracking-wide">
                  <span>{section.label && section.label.trim() !== "" ? section.label : section.type}</span>
                  {section.repeat > 1 && (
                    <span className="text-xs font-bold bg-accent/20 text-accent px-1.5 py-0.5 rounded">
                      x{section.repeat}
                    </span>
                  )}
                  <span className='text-sm font-mono capitalize text-muted-foreground'>
                    {section.sectionTranspose
                      ? (
                        `(Transpose ${section.step > 0
                          ? `+${section.step}`
                          : `${section.step}`})`
                      )
                      : ""
                    }
                  </span>
                </h4>

                {/* Loop Lines inside Section */}
                {section.lines?.map((line) => (
                  <div key={`native-line-${line.id}`} className="mt-1">
                    {/* LYRICS */}
                    {line.lyrics?.native && (
                      <div
                        className="flex flex-row"
                        style={
                          isChord || isNashville
                            ? { marginLeft: `${line.indent}px` }
                            : undefined
                        }
                      >
                        <p className='text-base font-mono'>
                          {line.lyrics.native}
                        </p>
                      </div>
                    )}
                    {isTranslation && line.lyrics?.translation && (
                      <span className="text-sm text-muted-foreground block ">{line.lyrics.translation}</span>
                    )}

                    {line.sectionBreak && "\u00A0"}

                  </div>
                ))}
              </div>
            ))}
          </div>
        )}


      </main>
    </div>
  );
};

export default ChordTableVersion4;