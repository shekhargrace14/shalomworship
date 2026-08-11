import PageHero from '@/components/layout/page-hero';
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

  const language = await getLanguage(code);

  if (!language) {
    notFound();
  }

  return (
    <>
      <PageHero data={language} />

      <div className="mx-auto w-full max-w-7xl p-4"></div>
    </>
  );
}
