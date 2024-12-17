import Head from "next/head";
import Image from "next/image";


async function fetchSongData(params) {
  const res = await fetch(
    `https://shalomworship.vercel.app/api/song/${params}`
  );
  const data = await res.json();
  const songData = await data.result;
  // console.log(songData, "songData");
  if (!songData) {
    return <p>No Song Found...</p>;
  }
  return songData
}

export async function generateMetadata({ params }) {
  const song =await fetchSongData(params.id)


  return {
    title: song.title,
    description: song.excerpt,
    keywords:song.seo.keywords,
    openGraph: {
      title: song.title,
      description: song.excerpt,
      url: `https://www.shalomworship.com/song/${song.seo.slug}`,
      images: [{ url: song.image }],
    },
  };
}


const Song = async ({ params }) => {
  // console.log(params.id, "params");
  const songData =await fetchSongData(params.id)
  

  return (
    <div className="bg-[#000000]  rounded-lg h-[90vh] overflow-y-auto custom-scrollbar">
      <div className="md:flex gap-4 p-4 text-white w-full bg-gradient-to-b from-[#1f1f1f] to-[#000000]">
        <div className=" sm:flex items-center gap-2 w-full ">
          <div className="h-full sm:w-4/12 sm:mb-0 mb-2 rounded-lg overflow-hidden  bg-[#e32f2f] ">
            <Image
              src={songData.image || "/default-image.jpg"}
              alt={songData.title || "Song Image"}
              width={200}
              height={100}
              className="bg-red-300 object-cover h-full w-full"
            />

          </div>
          <div className="sm:w-8/12 grid">
            <h1 className="text-4xl font-semibold mb-2">{songData.title}</h1>
            <div className="flex gap-2 items-baseline flex-wrap">
              <p className="font-bold leading-4">{songData.creator} -</p>
              {songData.artists.map((artist, index) => (
                <p key={index} className="font-light text-sm leading-4 ">
                  {artist}
                  {index < artist.length - 1 ? "," : ""}
                </p>
              ))}
            </div>
            <p className="text-sm mt-2">{songData.published_date}</p>
            <p className="text-sm mt-2">{songData.category}</p>
          </div>
        </div>
      </div>
      <main className="mx-auto p-4">
        <section className="w-full">
          <div dangerouslySetInnerHTML={{ __html: songData.content }} />
          {/* <div >{songData.content }</div> */}
            <p className="my-8">Credits -<a href={songData.credits} target="_blank">{songData.creator}</a></p>
        </section>
      </main>
    </div>
  );
};

export default Song;