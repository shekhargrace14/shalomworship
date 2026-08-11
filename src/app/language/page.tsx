import LanguageCard from '@/components/language/language-card';
import LanguageSection from '@/components/language/language-section';
import { getAllLanguages } from '@/lib/static';
import Link from 'next/link';
import React from 'react';

const page = async () => {
  const languages = await getAllLanguages();
  return (
    <div className="max-w-7xl w-full m-auto p-4">
      <div className="">
        <div className="w-full flex justify-between items-end ">
          <Link href={'/language'}>
            <h2 className="h2">Language</h2>
          </Link>
        </div>
        <LanguageSection languages={languages} />
      </div>
    </div>
  );
};

export default page;
