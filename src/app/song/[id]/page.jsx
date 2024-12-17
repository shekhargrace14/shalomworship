import { fetchServerSongById, fetchServerSongs } from "@/actions/song";
import parse from "html-react-parser";
import Image from "next/image";

export const revalidate = 60 * 60 * 24 * 7;
export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const song = await fetchServerSongById(params.id.split("_")[0]);
  const data = song.result;
  const Keywords = data?.seo?.keywords?.join(", ") || "";
  return {
    title: data?.title || "Untitled Song",
    description: data?.seo?.excerpt || "No description available",
    keywords: Keywords, // Reuse the 'keywords' variable
    openGraph: {
      title: data?.title || "Untitled Song",
      description: data?.seo?.excerpt || "No description available",
      url: `https://www.shalomworship.com/song/${data?.seo?.slug}`,
      images: [{ url: data?.image || "/default-image.jpg" }],
    },
  };
}

export async function generateStaticParams() {
  const songs = await fetchServerSongs();
  return songs.result
    .slice(0, 10)
    .map((song) => ({ id: `${song.id}_${song.seo?.slug}` || "" }));
}

const Song = async ({ params }) => {
  const songData = await fetchServerSongById(params.id.split("_")[0]);
  if (!songData.success)
    return <p className="text-white">No Song Found in page song...</p>;

  return (
    <div className="bg-[#000000]  rounded-lg h-[90vh] overflow-y-auto custom-scrollbar">
      <div className="md:flex gap-4 p-4 text-white w-full bg-gradient-to-b from-[#1f1f1f] to-[#000000]">
        <div className=" sm:flex items-center gap-2 w-full ">
          <div className="h-full sm:w-4/12 sm:mb-0 mb-2 rounded-lg overflow-hidden  bg-[#e32f2f] ">
            <Image
              src={songData.result.image || "/default-image.jpg"}
              alt={songData.result.title || "Song Image"}
              width={200}
              height={100}
              className="bg-red-300 object-cover h-full w-full"
              priority={100}
            />
          </div>
          <div className="sm:w-8/12 grid">
            <h1 className="text-4xl font-semibold mb-2">
              {songData.result.title}
            </h1>
            <div className="flex gap-2 items-baseline flex-wrap">
              <p className="font-bold leading-4">{songData.result.creator} -</p>
              {songData.result.artists && songData.result.artists.length > 0 ? (
                songData.result.artists.length > 1 ? (
                  songData.result.artists.map((artist, index) => (
                    <span key={index} className="font-light text-sm leading-4">
                      {artist}
                      {index < songData.result.artists.length - 1 ? ", " : ""}
                    </span>
                  ))
                ) : (
                  <p className="font-light text-sm leading-4">
                    {songData.result.artists[0]}
                  </p>
                )
              ) : (
                <p className="font-light text-sm leading-4">Unknown Artist</p>
              )}
            </div>
            <p className="text-sm mt-2">{songData.result.published_date}</p>
            <p className="text-sm mt-2">{songData.result.category}</p>
          </div>
        </div>
      </div>
      <main className="mx-auto p-4">
        <section className="w-full">
          <div>{parse(songData.result.content)}</div>
          <p className="my-8">
            Credits -
            <a href={songData.result.credits} target="_blank">
              {songData.result.creator}
            </a>
          </p>
        </section>
      </main>
    </div>
  );
};

export default Song;
