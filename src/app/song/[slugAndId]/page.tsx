
import Category from "@/components/category";
import CategoryCard from "@/components/CategoryCard";
import CreatorSongs from "@/components/CreatorSongs";
import Menu from "@/components/layout/Menu";
import ShareButton from "@/components/ShareButton";
import Lines from "@/components/shared/LinesVersion2";
import PlayButton from "@/components/ui/Play";
import Play from "@/components/ui/Play";
import Social from "@/components/ui/Social";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { category } from "@/lib/actions/category";
import { fetchSongById, fetchSongs } from "@/lib/query/query";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"

import { Dot } from "lucide-react";
import { FAQ } from "@/components/FAQ";
import LinesVersion3 from "@/components/shared/LinesVersion3";
import LinesVersion2 from "@/components/shared/LinesVersion2";
// import JsonLd from "@/components/Jsonld";
import { Fragment } from "react";
import JsonLd from "@/components/JsonLd";
import { parseSlugAndId } from "@/utils/parseSlugAndId";
import { getLanguageName } from "@/utils/getLanguageName";
import { Metadata } from "next";
import { buildSongMetadata } from "@/utils/seo";
import CategorySongs from "@/components/CategorySongs";
import InContentAd from "@/components/ads/InContentAd";
import { formatBold } from "@/utils/formatBold";
import { title } from "process";

async function fetchSongData({ id }: any) {

  const res = await fetchSongById(id); "use client";

  const data = res;
  return data || null;
}

export async function generateStaticParams() {
  const songs = await fetchSongs(); // Fetch all songs from your data source
  return songs.map(song => {
    const slug = slugify(`${song.title}`, { lower: true }) + '-' + song.id.toString();
    // console.log(slug, ""); // Log the slug here
    return { slug };
  });
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const slugAndId = params.slugAndId;
  const { id } = parseSlugAndId(slugAndId);

  const song = await fetchSongById(id);

  return buildSongMetadata({
    song,
    slugAndId,
  });
}

const Song = async ({ params }: any) => {
  // const slugAndId = await params.slugAndId; // this is the [slugAndId] part
  // const id = slugAndId?.split('-').pop(); // extract id from slug-id

  const { id } = parseSlugAndId(params?.slugAndId);


  if (!id) {
    return <p className="text-white">Invalid song ID.</p>;
  }

  // const id = await params.id;
  // console.log(id, " id of song page params");
  // console.log(slug, " slug of song page params");
  const songData = await fetchSongData({ id });
  if (!songData)
    return <p className="text-white">No Song Found in page song...</p>;
  // console.log(songData, "song  ")

  const artists: any[] = [];
  const creators: any[] = [];
  songData.artist.forEach((item) => {
    const a = item.artist
    if (item.isCreator) {
      creators.push(a);
    }
    // if (item.artist?.type === "individual" && item.isArtist === true) {
    if (item.isArtist) {
      artists.push(a);
    }
  });

  // console.log(artists, " artists of song page params");

  const albumTitle = songData?.album?.[0]?.album?.title || "";
  const albumSlug = songData?.album?.[0]?.album?.slug + "-" + songData?.album?.[0]?.album?.id || "";

  const categories = songData?.category.map(c => c.category.slug)
  // console.log(categories);
  const language = songData.language
  const langName = getLanguageName(language);
  const about = songData.about

  const alternateName = songData.searchVariant

  return (

    <div className="bg-background  rounded-lg h-[90vh] overflow-y-auto custom-scrollbar">
      <JsonLd id={id} />
      <div
        className="flex gap-4 p-4 mb-4 flex-col text-white w-full"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${songData.color}, transparent)`
        }}
      >
        <Menu />
        <InContentAd />
        <div className=" sm:flex items-center gap-4 w-full">
          <div className="h-full sm:w-4/12 sm:mb-0 mb-2 rounded-lg overflow-hidden bg-background ">
            {songData.videoId ?
              <YouTubeEmbed videoId={songData.videoId} title={songData?.title} />
              :
              <Image
                src={songData.image || "/default-image.jpg"}
                alt={songData.title || "Song Image"}
                width={200}
                height={100}
                className="bg-gray-800 object-cover h-full w-full"
                priority={true}
              />

            }
          </div>
          <div className="sm:w-8/12 grid gap-2">
            <h1 className="text-2xl md:text-4xl font-semibold mb-2 mt-2 text-foreground">
              {songData.title}{" "}
            </h1>
            <div className="flex gap-2">
              {creators.length > 0 ? (
                creators.map((creator, index) => (
                  <Link key={index} href={`/artist/${slugify(creators[0]?.slug, { lower: true })}-${creator?.id}`} className="flex items-center gap-2">
                    {/* <Avatar src={creator?.image || "/default-avatar.jpg"} size={34} /> */}
                    <Avatar>
                      <AvatarImage src={creator?.image || "/default-avatar.jpg"} />
                      <AvatarFallback>SW</AvatarFallback>
                    </Avatar>

                    <span className="font-semibold text-lg leading-4 text-foreground ">
                      {creator?.title}
                      {index < creators.length - 1 ? ", " : ""}
                    </span>
                  </Link>
                ))
              ) : (
                <p className="font-semibold text-sm leading-4 text-foreground ">
                  No creator specified
                </p>
              )}
            </div>
            <div className=" flex flex-wrap gap-2">

              {artists.length > 0 ? (
                artists.map((artist, index) => (
                  <Link key={index} href={`/artist/${slugify(artist?.title, { lower: true })}-${artist?.id}`}>
                    <div className=" text-base leading-4 text-foreground ">
                      {artist?.title}
                      {index < artists.length - 1 ? ", " : ""}
                    </div>
                  </Link>
                ))
              ) : (
                <p className="font-light text-sm leading-4 text-foreground"></p>
              )}
            </div>
            <div className="flex gap-2 flex-wrap items-center" >
              {songData.category && songData.category.length > 0 ? (
                songData.category.length > 1 ? (
                  songData.category.map((category, index) => (
                    <span
                      key={index}
                      className="font-light text-sm leading-4 text-foreground"
                    >
                      <Link href={`/category/${category?.category.slug}`}>
                        {category?.category.title}
                      </Link>
                      {index < songData.category.length - 1 ? ", " : ""}
                    </span>
                  ))
                ) : (
                  <p className="font-light text-sm leading-4 text-foreground ">
                    <Link
                      href={`/category/${songData.category[0]?.category.slug}`}
                    >
                      {songData.category[0]?.category.title}
                    </Link>
                  </p>
                )
              ) : (
                <p className="font-light text-sm leading-4 text-foreground">
                  Unknown category
                </p>
              )}
              <Dot className="text-foreground" />
              <p className="font-light text-sm leading-4 text-foreground">
                <Link href={`/language/${language}`}>
                  {langName}
                </Link>
              </p>
              <Dot className="text-foreground" />
              <div className=" ">
                <ShareButton title={songData.title} />
              </div>

            </div>
            {songData.album && songData.album.length > 0 && (
              <p className="text-sm text-foreground">
                Album :{" "}
                <Link href={`/album/${albumSlug}`}>
                  <strong> {albumTitle} </strong>
                </Link>
              </p>
            )}
            <div className="">
              {/* <p className="text-sm text-foreground " dangerouslySetInnerHTML={{
                __html: formatBold(about),
              }} ></p> */}
              <p className="text-xs">
                <strong>{songData.title}</strong>
                {`  is a ${langName} Christian worship song by `}
                <strong>{creators.map(c => c.title)}</strong>
                {`, commonly sung in moments of ${categories}. This page provides the ${langName} lyrics${songData.isChords ? ", chords, and Nashville Number System" : ""}${songData.isTranslation ? ", along with translations" : "."}`}
                {songData?.searchVariant && (
                  <>
                    {' and this song is widely known by the refrain "'}
                    <strong>{alternateName}</strong>
                    {'".'}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      <main className="mx-auto p-4 pt-4 relative">
        {songData.version === "version_1" ? <div>
          <section className="w-full text-foreground">
            <h2 className="text-xl md:text-2xl font-semibold mb-2 text-foreground">
              {songData.title} lyrics
            </h2>
            <div dangerouslySetInnerHTML={{ __html: songData.content }} />
          </section>
        </div> : null}
        {songData.version === "version_2" ? <LinesVersion2
          id={songData.id}
          song={songData}
          isChords={!!songData.isChords}
        /> : null}
        {songData.version === "version_3" ? <LinesVersion3
          id={songData.id}
          song={songData}
          isChords={!!songData.isChords}
          isTranslations={!!songData.isTranslation}
        /> : null}
        <section className="w-full text-foreground mt-12">
          {/* <div >{songData.content }</div> */}
          <div className="flex gap-2 items-baseline flex-wrap my-4">

            {creators.length > 0 ? (
              creators.map((creator, index) => (
                <span
                  key={index}
                  className="text-base font-semibold leading-4 text-foreground"
                >
                  Credits - &nbsp;
                  {creator.link ? (
                    <Link href={creator.link} target="_blank">
                      {creator.title}
                      {index < creators.length - 1 ? ", " : ""}
                    </Link>
                  ) : (
                    <>
                      {creator.title}
                      {index < creators.length - 1 ? ", " : ""}
                    </>
                  )}
                </span>
              ))
            ) : (
              <p className="font-light text-sm leading-4 text-foreground">
                No creator specified
              </p>
            )}
          </div>
        </section>
        <Social />
        {/* <FAQ
          title={songData.title}  
          artist={artists}
          category={creators}
          scripture={creators}
          meaning={songData.title}  
        /> */}
        <h2 className="text-xl font-semibold mb-2 mt-8 text-foreground">Songs Based on&nbsp;
          {songData.category && songData.category.length > 0 ? (
            songData.category.length > 1 ? (
              songData.category.map((category, index) => (
                <span
                  key={index}
                // className="font-light text-sm leading-4 text-foreground"
                >
                  <Link href={`/category/${category?.category.slug}`}>
                    {category?.category.title}
                  </Link>
                  {index < songData.category.length - 1 ? ", " : ""}
                </span>
              ))
            ) : (
              <Link
                href={`/category/${songData.category[0]?.category.slug}`}
              >
                {songData.category[0]?.category.title}
              </Link>
            )
          ) : (
            <p className="font-light text-sm leading-4 text-foreground">
              Unknown category
            </p>
          )}
        </h2>

        {categories.length > 0 ? (
          categories.map((id, index) => (
            <Fragment key={id}>
              <CategorySongs params={id} />
            </Fragment>
          ))
        ) : (
          <p className="font-light text-sm leading-4 text-foreground">
            No creator specified
          </p>
        )}

        <h2 className="text-xl font-semibold mb-2 mt-8 text-foreground">
          Popular songs &nbsp;
          {/* <Link className="underline" href={`/artist/${creators[0]?.id}- ${ slugify( creators[0]?.name), {lower: true}}`}> */}
          {/* <Link className="underline" href={`/artist/${slugify(creators[0]?.name, { lower: true })}-${creators[0]?.id}`}>
            {creators[0]?.name}
          </Link> */}
        </h2>

        {creators.length > 0 ? (
          creators.map((creator, index) => (
            <Fragment key={creator.id}>
              <CreatorSongs params={creator.id} />
            </Fragment>
          ))
        ) : (
          <p className="font-light text-sm leading-4 text-foreground">
            No creator specified
          </p>
        )}
      </main>
    </div>
  );
};
export default Song;
