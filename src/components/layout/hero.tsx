'use client';

import { useState } from 'react';
import { HeaderSearch } from '../search/HeaderSearch';
import WebGLBackground from './webgl-hero-background';
import { Badge } from '../ui/badge';
import Search from '../search/search';

const suggestions = ['goodness of god', 'maverick city', 'hindi worship', 'I love you Lord'];

export default function Hero() {
  const [search, setSearch] = useState('');

  const handleSuggestion = (value: string) => {
    setSearch(value);
  };

  return (
    <section className="relative isolate overflow-hidden bg-transparent rounded-xl">
      {/* WebGL Background */}
      <div className="absolute inset-0 -z-10">
        <WebGLBackground />
      </div>

      {/* Hero Content */}
      <div
        className="
          relative mx-auto flex min-h-[600px]
          max-w-6xl flex-col items-center
          justify-center px-4 py-20
          text-center
        "
      >
        {/* Eyebrow */}
        <div className="mb-6">
          <Badge variant="outline" className="gap-2 rounded-full px-3 py-1 text-muted-foreground">
            <span className="size-2 rounded-full bg-primary" />
            For worship teams
          </Badge>
        </div>

        {/* Heading */}
        <h1
          className="
            max-w-4xl
            text-4xl text-foreground font-extrabold tracking-tight
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
          "
        >
          Prepare worship.
          <br />
          Lead with <span className="text-primary">confidence.</span>
        </h1>

        {/* Description */}
        <p
          className="
            w-10/12
            mb-4 mt-6 max-w-2xl
            text-sm md:leading-7
            text-muted-foreground
            sm:text-base
          "
        >
          Find worship songs, lyrics, chords, translations, and resources for your next service.
        </p>

        {/* Search */}
        <div className="w-full max-w-2xl">
          <Search />
        </div>

        {/* Search Suggestions */}
        <div className="mt-5 flex max-w-3xl flex-wrap items-center justify-center gap-2 text-sm">
          <span className="mr-1 text-muted-foreground">Try:</span>

          {suggestions.map((suggestion) => (
            <Badge variant="outline" className="px-2 py-1 text-muted-foreground" key={suggestion} onClick={() => handleSuggestion(suggestion)}>
              {suggestion}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
