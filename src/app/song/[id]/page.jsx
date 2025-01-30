import { fetchSongBySlug, fetchSongs} from "@/app/reactQuery/query";
import CreatorSongs from "@/components/CreatorSongs";
import { MetaData } from "@/components/MetaData";
import ShareButton from "@/components/ShareButton";
import Social from "@/components/Social";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 604800;

// export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const songs = await fetchSongs(); // Fetch all songs from your data source
  return songs.map(song => ({
    id: song.id.toString(), // Convert to string if necessary
  }));
}

async function fetchSongData(id) {
  const res = await fetchSongBySlug(id);
  // console.log(res, "page res result");

  const data = res;
  return data || null;
}
export async function generateMetadata({ params }) {
  return await MetaData({params})
}

const Song = async ({ params }) => {
  const id = await params.id;
  // console.log(id, " id of song page params");
  const songData = await fetchSongData(id);
  if (!songData)
    return <p className="text-white">No Song Found in page song...</p>;

  const artists = [];
  const creators = [];
  songData.artist.forEach((item) => {
    if (item.isCreator) {
      creators.push(item.artist);
    } else {
      artists.push(item.artist);
    }
  });
  // console.log(artists, " artists of song page params");
  // console.log(creators, " creators of song page params");

  return (
    <div className="bg-[#000000]  rounded-lg h-[90vh] overflow-y-auto custom-scrollbar">
      <div className="md:flex gap-4 p-4 text-white w-full bg-gradient-to-b from-[#1f1f1f] to-[#000000]">
        <div className=" sm:flex items-center gap-2 w-full ">
          <div className="h-full sm:w-4/12 sm:mb-0 mb-2 rounded-lg overflow-hidden  bg-[#121212] ">
            <Image
              src={songData.image || "/default-image.jpg"}
              alt={songData.title || "Song Image"}
              width={200}
              height={100}
              className="bg-gray-800 object-cover h-full w-full"
              priority={100}
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
                  <Link key={index} href={`/artist/${creator?.slug}`}>

                  <span
                    className="font-semibold text-base leading-4 text-white underline"
                    >
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
                  <Link key={index} href={`/artist/${artist?.slug}`}>
                  <span
                    
                    className="font-light text-sm leading-4 text-white underline"
                    >
                    {artist?.name}
                    {index < artists.length - 1 ? ", " : ""}
                  </span>
                    </Link>
                ))
              ) : (
                <p className="font-light text-sm leading-4 text-white">
                  
                </p>
              )}
            </div>

            <div className="flex gap-2 items-baseline flex-wrap">
              {songData.category && songData.category.length > 0 ? (
                songData.category.length > 1 ? (
                  songData.category.map((category, index) => (
                    <span
                      key={index}
                      className="font-light text-sm leading-4 text-white"
                    >
                      {category?.category.name}
                      {index < songData.category.length - 1 ? ", " : ""}
                    </span>
                  ))
                ) : (
                  <p className="font-light text-sm leading-4 text-white">
                    {songData.category[0]?.category.name}
                  </p>
                )
              ) : (
                <p className="font-light text-sm leading-4 text-white">
                  Unknown category
                </p>
              )}
              &bull;
              <p className="text-sm mt-2 text-white">
                {new Date(songData.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
      <main className="mx-auto p-4 relative">
        <div className="absolute right-2 top-[12px]">
          <ShareButton title={songData.title}/>
        </div>
        <section className="w-full text-white">
          <h2 className="text-2xl font-semibold mb-2 text-white">
            {songData.title} lyrics
          </h2>
          <div dangerouslySetInnerHTML={{ __html: songData.content }} />
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
        <Social/>
        <h3 className="sm:text-xl text-base font-semibold mb-2 mt-8 text-white">
          Song You May Like from &nbsp; 
          <Link className="underline" href={`/artist/${creators[0]?.slug}`}>
            {creators[0]?.name}
          </Link>
          
        </h3>

        {creators.length > 0 ? (
          creators.map((creator, index) => (
            <CreatorSongs key={index} params={creator} />
          ))
        ) : (
          <p className="font-light text-sm leading-4 text-white">
            No creator specified
          </p>
        )}
      </main>
    </div>
  );
};

export default Song;
