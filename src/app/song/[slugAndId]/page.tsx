
import Category from "@/components/category";
import CategoryCard from "@/components/CategoryCard";
import CreatorSongs from "@/components/CreatorSongs";
import Menu from "@/components/layout/Menu";
import { MetaData } from "@/components/MetaData";
import ShareButton from "@/components/ShareButton";
import Lines from "@/components/shared/Lines";
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

import formatArtists from "@/utils/formatArtists";
import { Dot } from "lucide-react";
import { FAQ } from "@/components/FAQ";

interface ArtistItem {
  artist: { title: string; id: string; link: string; type: string; isArtist: string; };
  isCreator: boolean;
}

export async function generateStaticParams() {
  const songs = await fetchSongs(); // Fetch all songs from your data source
  return songs.map(song => {
    const slug = slugify(`${song.title}`, { lower: true }) + '-' + song.id.toString();
    // console.log(slug, ""); // Log the slug here
    return { slug };
  });
}
export async function generateMetadata({ params }: any) {
  const slugAndId = await params.slugAndId; // this is the [slugAndId] part
  const id = slugAndId.split('-').pop(); // extract id from slug-id


  // const slugParams = await params.id;
  const song = await fetchSongById(id);
  // console.log(song, " song of song page params");
  // const title = (await song?.title) + " " + "by " + (await song?.artist[0]?.artist?.name) || "Unknown Song";
  const mainArtists = song?.artist?.filter((a) => a.isArtist) || [];
  const creatorArtists = song?.artist?.filter((a) => a.isCreator) || [];
  // console.log(mainArtists, " mainArtists of song page params");
  // console.log(creatorArtists, " creatorArtists of song page params");

  // const artistNames = mainArtists.map((a) => a.artist?.name).join(", ");
  const creatorNames = creatorArtists.map((a) => a.artist?.title).join(", ");

  const artistNames = formatArtists(mainArtists.map((a) => a.artist?.title));
  // const formatedCreatorNames = formatArtists(creatorNames);

  const title =
    (song?.title || "Unknown Title") +
    (song?.isChords ? " Chords & Lyrics" : " Lyrics") +
    (mainArtists.length > 0 ? " - " + artistNames : "") +
    (creatorArtists.length > 0 ? " | " + creatorNames : "") + " | Shalom Worship"


  const keyword = await song?.keyword;
  const metaDescription = await song?.metaDescription;
  const slug = slugify(`${song?.title}`, { lower: true }) + '-' + song?.id.toString();

  const image = await song?.image;
  // console.log(title);

  return await MetaData({ title, keyword, metaDescription, slug, image });

}
async function fetchSongData({ id }: any) {

  const res = await fetchSongById(id); "use client";

  const data = res;
  return data || null;
}


const Song = async ({ params }: any) => {
  const slugAndId = await params.slugAndId; // this is the [slugAndId] part
  const id = slugAndId?.split('-').pop(); // extract id from slug-id


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
    if (item.artist?.type === "individual" && item.isArtist === true) {
      artists.push(a);
    }
  });

  // console.log(artists, " artists of song page params");
  // console.log(creators[0]?.id, " creators of song page params");



  return (
    <div className="bg-background  rounded-lg h-[90vh] overflow-y-auto custom-scrollbar">
      <div
        className="flex gap-4 p-4 mb-4 flex-col text-white w-full"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${songData.color}, transparent)`
        }}
      >
        <Menu />
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
            {creators.length > 0 ? (
              creators.map((creator, index) => (
                <Link key={index} href={`/artist/${slugify(creators[0]?.title, { lower: true })}-${creator?.id}`} className="flex items-center gap-2">
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
              {/* <p className="text-sm  text-white">
                {new Date(songData.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p> */}
              <div className=" ">
                <ShareButton title={songData.title} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Ad1 /> */}
      {/* <PlayButton
        audioUrl="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        title={songData.title}
        artist={creators[0]?.name || artists[0]?.name || "Unknown Artist"}
        image={songData.image || "/default-image.jpg"}
      /> */}
      <main className="mx-auto p-4 pt-4 relative">
        {/* <div className="absolute right-2 sm:top-[12px] top-[-8px]">
          <ShareButton title={songData.title} />
        </div> */}
        {
          songData.lines && Array.isArray(songData.lines) && songData.lines.length > 0 ? (
            <Lines id={songData.id} song={songData} isChords={!!songData.isChords} />
          ) : (
            <section className="w-full text-foreground">
              <h2 className="text-xl md:text-2xl font-semibold mb-2 text-foreground">
                {songData.title} lyrics
              </h2>
              <div dangerouslySetInnerHTML={{ __html: songData.content }} />
            </section>
          )
        }
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
                  <Link href={creator.link} target="_blank">
                    {creator.title}
                    {index < creators.length - 1 ? ", " : ""}
                  </Link>
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
        <h2 className="text-xl font-semibold mb-2 mt-8 text-foreground">
          Popular songs &nbsp;
          {/* <Link className="underline" href={`/artist/${creators[0]?.id}- ${ slugify( creators[0]?.name), {lower: true}}`}> */}
          {/* <Link className="underline" href={`/artist/${slugify(creators[0]?.name, { lower: true })}-${creators[0]?.id}`}>

            {creators[0]?.name}
          </Link> */}
        </h2>

        {creators.length > 0 ? (
          creators.map((creator, index) => (
            <CreatorSongs key={index} params={creator} />
          ))
        ) : (
          <p className="font-light text-sm leading-4 text-foreground">
            No creator specified
          </p>
        )}

        {/* song by category  */}
        {/* <h2 className="text-xl font-semibold mb-2 mt-8 text-white">
          Song based on categories &nbsp;
          <Link className="underline" href={`/artist/${slugify(creators[0]?.name, { lower: true })}-${creators[0]?.id}`}>

            {songData.category.map((category,index)=>(
              <div key={index}>
              <p>{category.category.slug}</p>
              <Category slug={category.category.slug}/>
              </div>

            ))}
          </Link>
        </h2> */}
      </main>
    </div>
  );
};
export default Song;
