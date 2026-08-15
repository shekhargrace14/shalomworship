import PageHero from '@/components/layout/page-hero';
import Processor from '@/components/Processor';
import { CONTENT_VISIBILITY } from '@/lib/contentVisibility';
import { getAllLanguages, getLanguage } from '@/lib/static';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    code: string;
  }>;
}

export async function generateStaticParams() {
  const languages = await getAllLanguages();

  return (languages ?? []).map((language) => ({
    code: language.code,
  }));
}

export default async function Page({ params }: PageProps) {
  const { code } = await params;

  const languageData = await getLanguage(code, [...CONTENT_VISIBILITY.public]);
  const data = languageData;
  const songs = data?.songs ? [...data.songs].reverse() : [];
  const hasSongs = songs.length > 0;

  if (!data) {
    notFound();
  }

  return (
    <>
      <PageHero data={data} type="language" />
      <div className="mx-auto w-full max-w-7xl p-4"></div>
      {hasSongs ? <h2 className="text-xl font-semibold m-4 text-foreground">Songs in {data?.title + ' Language' || 'Language'} </h2> : null}
      <section className="w-full px-2">
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 ">
          {songs.map((item) => (
            <div key={item.id}>
              <Processor item={item?.songId} type="artist" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
