import Image from "next/image";

export const revalidate = 60 * 60 * 24 * 7;
export const dynamic = "force-dynamic";

async function fetchSongData(id) {
  // const songurl = "http://localhost:3000";
  const songurl = "https://www.shalomworship.com";
  try {
    const res = await fetch(`${songurl}/api/song/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data?.result || null;
  } catch (error) {
    // console.error("Error fetching song data:", error);
    return null; // Return null to prevent further issues
  }
}

export async function generateMetadata({ id }) {
  // console.log(params.id, "params  generateMetadata");
  const song = await fetchSongData(id);

  if (!song) {
    return {
      title: "Song Not Found",
      description: "The requested song could not be found.",
    };
  }
  const Keywords = song?.keywords?.join(", ") || "";

  return {
    title: song.title + " lyrics" || "Untitled Song",
    description: song.meta_description || "No description available",
    keywords: Keywords, // Reuse the 'keywords' variable
    openGraph: {
      title: song.title + "lyrics" || "Untitled Song",
      description: song.meta_description || "No description available",
      url: `https://www.shalomworship.com/song/${song?.slug}`,
      images: [{ url: song.image || "/default-image.jpg" }],
    },
  };
}

const Song = async ({ params }) => {
  const id = await params.id;
  console.log(id," id of song page params")
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
            <h1 className="text-4xl font-semibold mb-2 text-white">{songData.title} </h1>
            <div className="flex gap-2 items-baseline flex-wrap">
              <p className="font-bold leading-4 text-white">{songData.creator} -</p>
              {songData.artists && songData.artists.length > 0 ? (
                songData.artists.length > 1 ? (
                  songData.artists.map((artist, index) => (
                    <span key={index} className="font-light text-sm leading-4 text-white">
                      {artist}
                      {index < songData.artists.length - 1 ? ", " : ""}
                    </span>
                  ))
                ) : (
                  <p className="font-light text-sm leading-4 text-white">
                    {songData.artists[0]}
                  </p>
                )
              ) : (
                <p className="font-light text-sm leading-4 text-white">Unknown Artist</p>
              )}
            </div>
            <p className="text-sm mt-2 text-white">{songData.published_date}</p>
            <p className="text-sm mt-2 text-white">{songData.category}</p>
          </div>
        </div>
      </div>
      <main className="mx-auto p-4">
        <section className="w-full text-white">
          <div dangerouslySetInnerHTML={{ __html: songData.content }} />
          {/* <div >{songData.content }</div> */}
          <p className="my-8">
            Credits -  &nbsp;
            <a href={songData.credits} target="_blank">
              {songData.creator}
            </a>
          </p>
        </section>
      </main>
    </div>
  );
};

export default Song;
