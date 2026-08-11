import { colorPalette } from '@/types';
import { Card } from '../ui/card';
import { getAllLanguages } from '@/lib/static';
import Link from 'next/link';
import { language } from '@prisma/client';

export default async function LanguageCard({ language, color }: any) {
  // const languages = await getAllLanguages()
  //   const sortedLanguages = [...(languages ?? [])]
  // .sort((a, b) => b.songs.length - a.songs.length)
  // .slice(0, 6);
  return (
    <Link href={`/language/${language.code}`}>
      <Card
        key={language.name}
        style={
          {
            '--language-color': color,
          } as React.CSSProperties
        }
        className="
                              group
                              flex
                              items-start
                              cursor-pointer
                              justify-between
                              rounded-xl
                              border-0
                              bg-[var(--language-color)]
                              p-4
                              text-left
                              transition-all
                              duration-200
                              hover:-translate-y-0.5
                              hover:brightness-95
                        "
      >
        <div className="flex justify-end w-full">
          <p
            className="
                                text-3xl
                                font-semibold
                                text-[color-mix(in_oklch,var(--language-color)_60%,black)]
                                transition-all
                                duration-200
                                group-hover:brightness-75
                                "
          >
            {language.symbol}
          </p>
        </div>
        <span className="text-xl font-bold text-black">{language.name}</span>
      </Card>
    </Link>
  );
}
