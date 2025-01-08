import { fetchSongById } from "@/app/reactQuery/query";
import Image from "next/image";

export const revalidate = 604800;

export const dynamic = "force-dynamic";

async function fetchSongData(id) {
  // try {
  // const res = await fetch(`${songurl}/api/song/${id}`);
  const res = fetchSongById(id);
  // console.log(res, "page res result")
  // if (!res.ok) {
  //   throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
  // }
  const data = res;
  return data || null;
  // } catch (error) {
  //   console.error("Error fetching song data:", error.message); // Log specific error messages
  //   return null; // Return null to prevent further issues
  // }
}

export async function generateMetadata({ params }) {
  const id = params.id;
  // console.log(params.id, "params  generateMetadata");
  const song = await fetchSongData(id);
  // console.log(song, "song  generateMetadata");

  if (!song) {
    return {
      title: "Song Not Found",
      description: "The requested song could not be found.",
    };
  }
  const Keywords = song?.keyword?.join(", ") || "";

  return {
    title: song.title + " " + "lyrics" || "Untitled Song",
    description: song.metaDescription || "No description available",
    keywords: Keywords, // Reuse the 'keywords' variable

    openGraph: {
      title: song.title + " lyrics" || "Untitled Song",
      description: song.metaDescription || "No description available",
      url: `https://www.shalomworship.com/song/${song?.slug}`,
      images: [{ url: song.image || "/default-image.jpg" }],
    },
  };
}

const Song = async ({ params }) => {
  const id = params.id;
  // console.log(id," id of song page params")
  const songData = await fetchSongData(id);
  if (!songData)
    return <p className="text-white">No Song Found in page song...</p>;

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

            <div className="flex gap-2 items-baseline flex-wrap">
              {songData.creator.name} -
              {songData.artist && songData.artist.length > 0 ? (
                songData.artist.length > 1 ? (
                  songData.artist.map((artist, index) => (
                    <span
                      key={index}
                      className="font-light text-sm leading-4 text-white"
                    >
                      {artist.artist.name}
                      {index < songData.artist.length - 1 ? ", " : ""}
                    </span>
                  ))
                ) : (
                  <p className="font-light text-sm leading-4 text-white">
                    {songData.artist[0].artist.name}
                  </p>
                )
              ) : (
                <p className="font-light text-sm leading-4 text-white">
                  Unknown Artist
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
                      {category.category.name}
                      {index < songData.category.length - 1 ? ", " : ""}
                    </span>
                  ))
                ) : (
                  <p className="font-light text-sm leading-4 text-white">
                    {songData.category[0].category.name}
                  </p>
                )
              ) : (
                <p className="font-light text-sm leading-4 text-white">
                  Unknown category
                </p>
              )}

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
      <main className="mx-auto p-4">
        <section className="w-full text-white">
          <div dangerouslySetInnerHTML={{ __html: songData.content }} />
          {/* <div >{songData.content }</div> */}
          <p className="my-8">
            Credits - &nbsp;
            <a href={songData.creator.link} target="_blank">
              {songData.creator.name}
            </a>
          </p>
        </section>
      </main>
    </div>
  );
};

export default Song;
