// import Ad1 from "@/components/Ad1";
import CreatorSongs from "@/components/CreatorSongs";
import Menu from "@/components/layout/Menu";
import { MetaData } from "@/components/MetaData";
import ShareButton from "@/components/ShareButton";
import Lines from "@/components/shared/Lines";
import PlayButton from "@/components/ui/Play";
import Play from "@/components/ui/Play";
import Social from "@/components/ui/Social";
import { fetchSongById, fetchSongs } from "@/lib/query/query";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";

export const revalidate = 60;

// export const dynamic = "force-dynamic";

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
  const title = (await song?.title) + " ";
  const keyword = await song?.keyword;
  const metaDescription = await song?.metaDescription;
  const slug = slugify(`${song?.title}`, { lower: true }) + '-' + song?.id.toString();

  const image = await song?.image;
  // console.log(title);

  return await MetaData({ title, keyword, metaDescription, slug, image });
}
async function fetchSongData({ id }: any) {
  // const res = await fetchSongBySlug(id);
  const res = await fetchSongById(id); "use client";


  interface ArtistItem {
    artist: { name: string; id: string; link: string };
    isCreator: boolean;
  }

  const SongCard = ({ item }: any) => {
    // console.log(item, "card item")
    const artists: { name: string; id: string; link: string }[] = [];
    const creators: { name: string; id: string; link: string }[] = [];
    item.artist.forEach((item: ArtistItem) => {
      if (item.isCreator) {
        creators.push(item.artist);
      } else {
        artists.push(item.artist);
      }
    });
    // console.log(artists, " artists of song page params");
    // console.log(creators, " creators of song page params");\
    const slug = slugify(`${item.title}`, { lower: true })
    return (
      <>
        <Link href={`/song/${item.id}-${slug}`}>
          <div className=" sm:hover:bg-[#1f1f1f] sm:p-2 rounded-lg">
            <div className="rounded-lg overflow-hidden h-5/6">
              <Image
                src={item.image}
                alt={item.title || "Song Image"}
                width={700}
                height={500}
              />
            </div>
            <div className="w-full lg:w-full py-2">
              <div className="">
                <h3 className="line-clamp-1 text-1xl font-semibold mb-1 text-white">{item.title}</h3>
                <p className=" line-clamp-1 text-sm leading-none text-[#b3b3b3]">{creators[0]?.name}</p>
              </div>
            </div>
          </div>
        </Link>
      </>
    );
  }

  // console.log(res, "song page res result");

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

  const artists: any[] = [];
  const creators: any[] = [];
  songData.artist.forEach((item) => {
    if (item.isCreator) {
      creators.push(item.artist);
    } else {
      artists.push(item.artist);
    }
  });
  // console.log(artists, " artists of song page params");
  // console.log(creators[0].id, " creators of song page params");

  return (
    <div className="bg-[#000000]  rounded-lg h-[90vh] overflow-y-auto custom-scrollbar">
      <div className="p-4 pb-0 bg-[#1f1f1f]">
        <Menu />
      </div>
      {/* <section className="p-4 bg-[#1f1f1f]">
          <ChordTable id="6778cedcb965402bde0996e5"/>
        </section> */}
      <div className="md:flex gap-4 p-4 text-white w-full bg-gradient-to-b from-[#1f1f1f] to-[#000000]">
        <div className=" sm:flex items-center gap-2 w-full ">
          <div className="h-full sm:w-4/12 sm:mb-0 mb-2 rounded-lg overflow-hidden  bg-[#121212] ">
            <Image
              src={songData.image || "/default-image.jpg"}
              alt={songData.title || "Song Image"}
              width={200}
              height={100}
              className="bg-gray-800 object-cover h-full w-full"
              priority={true}
            />
          </div>

          <div className="sm:w-8/12 grid">
            <h1 className="text-4xl font-semibold mb-2 text-white">
              {songData.title}{" "}
            </h1>

            {/* ////////////////////////////////////////////////////////////////////////////// */}

            {/* ////////////////////////////////////////////////////////////////////////////// */}

            <div className="flex gap-2 items-baseline flex-wrap">
              <div>
                {creators.length > 0 ? (
                  creators.map((creator, index) => (
                    <Link key={index} href={`/artist/${slugify(creators[0]?.name, { lower: true })}-${creator?.id}`}>
                      <span className="font-semibold text-base leading-4 text-white underline">
                        {creator?.name}
                        {index < creators.length - 1 ? ", " : ""}
                      </span>
                    </Link>
                  ))
                ) : (
                  <p className="font-semibold text-sm leading-4 text-white ">
                    No creator specified
                  </p>
                )}
              </div>
              -
              {artists.length > 0 ? (
                artists.map((artist, index) => (
                  <Link key={index} href={`/artist/${slugify(artist?.name, { lower: true })}-${artist?.id}`}>
                    <span className="font-light text-sm leading-4 text-white underline">
                      {artist?.name}
                      {index < artists.length - 1 ? ", " : ""}
                    </span>
                  </Link>
                ))
              ) : (
                <p className="font-light text-sm leading-4 text-white"></p>
              )}
            </div>

            <div className="flex gap-2 flex-wrap items-center" >
              {songData.category && songData.category.length > 0 ? (
                songData.category.length > 1 ? (
                  songData.category.map((category, index) => (
                    <span
                      key={index}
                      className="font-light text-sm leading-4 text-white underline"
                    >
                      <Link href={`/category/${category?.category.slug}`}>
                        {category?.category.name}
                      </Link>
                      {index < songData.category.length - 1 ? ", " : ""}
                    </span>
                  ))
                ) : (
                  <p className="font-light text-sm leading-4 text-white underline">
                    <Link
                      href={`/category/${songData.category[0]?.category.slug}`}
                    >
                      {songData.category[0]?.category.name}
                    </Link>
                  </p>
                )
              ) : (
                <p className="font-light text-sm leading-4 text-white">
                  Unknown category
                </p>
              )}
              &bull;
              <p className="text-sm md:mt-0 mt-2 text-white">
                {new Date(songData.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <div className=" ">
                <ShareButton title={songData.title} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Ad1 /> */}
      <PlayButton
        audioUrl="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        title={songData.title}
        artist={creators[0]?.name || artists[0]?.name || "Unknown Artist"}
        image={songData.image || "/default-image.jpg"}
      />
      <main className="mx-auto p-4 pt-8 relative">
        {/* <div className="absolute right-2 sm:top-[12px] top-[-8px]">
          <ShareButton title={songData.title} />
        </div> */}
        {
          songData.lines && Array.isArray(songData.lines) && songData.lines.length > 0 ? (

            <Lines id={songData.id} song={songData}/>
          ) : (

            <section className="w-full text-white">
              <h2 className="text-2xl font-semibold mb-2 text-white">
                {songData.title} lyrics
              </h2>
              <div dangerouslySetInnerHTML={{ __html: songData.content }} />
            </section>
          )

        }
        <section className="w-full text-white">

          {/* <div >{songData.content }</div> */}
          <div className="flex gap-2 items-baseline flex-wrap my-4">
            {creators.length > 0 ? (
              creators.map((creator, index) => (
                <span
                  key={index}
                  className="text-base font-semibold leading-4 text-white"
                >
                  Credits - &nbsp;
                  <Link href={creator.link} target="_blank">
                    {creator.name}
                    {index < creators.length - 1 ? ", " : ""}
                  </Link>
                </span>
              ))
            ) : (
              <p className="font-light text-sm leading-4 text-white">
                No creator specified
              </p>
            )}
          </div>
        </section>
        <Social />
        <h2 className="text-xl font-semibold mb-2 mt-8 text-white">
          Song You May Like from &nbsp;
          {/* <Link className="underline" href={`/artist/${creators[0]?.id}- ${ slugify( creators[0]?.name), {lower: true}}`}> */}
          <Link className="underline" href={`/artist/${creators[0]?.id}-${slugify(creators[0]?.name, { lower: true })}`}>

            {creators[0]?.name}
          </Link>
        </h2>

        {creators.length > 0 ? (
          creators.map((creator, index) => (
            <CreatorSongs key={index} params={creator} />
          ))
        ) : (
          <p className="font-light text-sm leading-4 text-white">
            No creator specified
          </p>
        )}

        {/* song by category  */}
      </main>
    </div>
  );
};
export default Song;
