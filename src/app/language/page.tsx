import LanguageCard from '@/components/language/language-card';
import LanguageSection from '@/components/language/language-section';
import PageHero from '@/components/layout/page-hero';
import { getAllLanguages } from '@/lib/static';
import Link from 'next/link';
import React from 'react';

const page = async () => {
  const languages = await getAllLanguages();
  return (
    <div className="max-w-7xl w-full m-auto ">
      <div
        className="w-full p-4 pt-40 rounded-xl "
        style={{
          backgroundImage: `linear-gradient(to bottom, oklch(68.699% 0.11763 191.228), transparent)`,
        }}
      >
        <h1 className="text-3xl md:text-6xl tracking-tight font-bold ">Languages</h1>
      </div>
      <div className="p-4">
        <LanguageSection languages={languages} />
      </div>
    </div>
  );
};

export default page;
