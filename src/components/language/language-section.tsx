import React from 'react';
import LanguageCard from './language-card';
import { colorPalette } from '@/types';

type Props = {
  id: string;
  title: string;
  image: string;
};

const LanguageSection: React.FC<any> = ({ number, languages }) => {
  const sortedLanguages = [...(languages ?? [])].sort((a, b) => b.songs.length - a.songs.length).slice(0, number);
  return (
    <>
      <section className="w-full my-2">
        <div className="grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 ">
          {sortedLanguages?.map((item: Props, index: number) => {
            const color = colorPalette[index % colorPalette.length];
            return <LanguageCard key={item.id} language={item} color={color} />;
          })}
        </div>
      </section>
    </>
  );
};

export default LanguageSection;
