type Section = {
  type: string;
  order: number;
  label: { hi: string; en: string };
  lines: Line[];
};

type Line = {
  chords?: Chord[];
  lyrics: { hi: string; en: string };
  translation?: { en: string };
  break?: boolean;
};

type Chord = {
  root: string;
  number: number | null;
  quality: string;
  space: number | null;
};

export function LyricsRenderer({ sections }: { sections: Section[] }) {
  return (
    <div className="space-y-8">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="space-y-4">
          {/* Section Label */}
          <h3 className="text-sm font-semibold uppercase text-muted-foreground">{section.label.en}</h3>

          {/* Section Lines */}
          <div className="space-y-3">
            {section.lines.map((line, lineIndex) => (
              <div key={lineIndex}>
                {/* Chords */}
                {line.chords && (
                  <div className="flex gap-2 text-xs text-blue-600">
                    {line.chords.map((chord, chordIndex) => (
                      <span key={chordIndex}>
                        {chord.root}
                        {chord.quality}
                        {chord.number ?? ''}
                      </span>
                    ))}
                  </div>
                )}

                {/* Lyrics */}
                <div className="text-base font-medium">{line.lyrics.hi}</div>

                {/* Translation (optional) */}
                {line.translation?.en && <div className="text-sm text-muted-foreground">{line.translation.en}</div>}

                {/* Break */}
                {line.break && <div className="h-4" />}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
