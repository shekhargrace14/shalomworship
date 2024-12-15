import Head from "next/head";
import Image from "next/image";


export async function generateMetadata({ params }) {
  const res = await fetch(`https://shalomworship.vercel.app/api/song/${params.id}`);

  if (!res.ok) {
    // Handle error: log, return fallback metadata, or throw an error
    console.error(`Failed to fetch metadata: ${res.status} ${res.statusText}`);
    return {
      title: "Song Not Found",
      description: "The song could not be retrieved.",
    };
  }

  const song = await res.json();

  return {
    title: song.title,
    description: song.excerpt,
    openGraph: {
      title: song.title,
      description: song.excerpt,
      // url: `https://www.shalomworship.com/blog/${song.params.id}`,
      images: [{ url: song.image }],
    },
  };
}

const Song = async ({ params }) => {
  console.log(params.id, "params");
  const res = await fetch(
    `https://shalomworship.vercel.app/api/song/${params.id}`
  );
  const data = await res.json();
  const songData = await data.result;
  console.log(songData, "songData");
  if (!songData) {
    return <p>No Song Found...</p>;
  }

  return (
    <div className="bg-[#1f1f1f] rounded-lg overflow-hidden">
      <Head>
        <title>{songData.title}</title>
        {/* <meta name="description" content={description || 'Find the lyrics and chords of this song'} /> */}
        {/* <meta name="keywords" content={`song, lyrics, chords, ${title}`} /> */}
        {/* <meta property="og:title" content={title} /> */}
        {/* <meta property="og:description" content={description || 'Discover amazing worship songs.'} /> */}
        {/* <meta property="og:type" content="article" /> */}
      </Head>
      <div className="md:flex gap-4 p-4 text-white w-full bg-[#121212]">
        <div className=" sm:flex items-center gap-2 w-full ">
          <div className="sm:w-4/12 sm:mb-0 mb-2 rounded-lg overflow-hidden">
            <Image
              src={songData.image}
              alt={songData.title || "Song Image"}
              className="object-cover w-full h-full"
              width={200}
              height={100}
            />
          </div>
          <div className="sm:w-8/12 grid">
            <h1 className="text-4xl font-semibold mb-2">{songData.title}</h1>
            <div className="flex gap-2 items-baseline flex-wrap">
              <p className="font-bold">{songData.creator} -</p>
              {songData.artists.map((artist, index) => (
                <p key={index} className="font-light text-sm">
                  {artist}
                  {index < artist.length - 1 ? "," : ""}
                </p>
              ))}
            </div>
            <p className="text-sm mt-0">{songData.published_date}</p>
          </div>
        </div>
      </div>
      <main className="lg:container mx-auto p-4">
        <section className="w-full">
          <div dangerouslySetInnerHTML={{ __html: songData.content }} />
          {/* <div >{songData.content }</div> */}
          <a href={songData.credits} target="_blank">
            <p className="my-8">Credits - {songData.creator}</p>
          </a>
        </section>
      </main>
    </div>
  );
};

export default Song;
