// export async function generateMetadata({ params }) {
//   // Fetch metadata from the API
//   console.log(params)
//   const res = await fetch(`https://shalomworship.vercel.app/api/song/${params.id}`);
//   const song = await res.json();

//   return {
//     title: song.title,
//     description: song.excerpt,
//     openGraph: {
//       title: song.title,
//       description: song.excerpt,
//       url: `https://www.shalomworship.com/blog/${song.seo.slug}`,
//       images: [{ url: song.image }],
//     },
//   };
// }

const Song = async ({ params }) => {
  const res = await fetch(`https://shalomworship.vercel.app/api/song/${params.id}`);
  const songData = await res.json();

  if (!songData) {
    return <p>No Song Found...</p>;
  }

  const { title, image, excerpt, creator, artists, content, published_date, credits } = songData;

  return (
    <div className="bg-[#1f1f1f] rounded-lg">
      <div className="lg:container mx-auto p-4 md:flex gap-4 text-white">
        <div className="bg-gray-800 flex items-center md:w-4/12 rounded-lg overflow-hidden">
          <img src={image} alt={title || "Song Image"} className="object-cover w-full h-full" />
        </div>
        <div className="md:w-8/12 grid">
          <h1 className="text-4xl font-semibold mb-2">{title}</h1>
          <div className="flex gap-2 items-baseline flex-wrap">
            <p className="font-bold">{creator} -</p>
            {artists.map((artist, index) => (
              <p key={index} className="font-light text-sm">{artist}{index < artists.length - 1 ? ',' : ''}</p>
            ))}
          </div>
          <p className="text-sm mt-0">{published_date}</p>
        </div>
      </div>
      <main className="lg:container mx-auto p-4">
        <section className="w-full">
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <a href={credits} target="_blank">
            <p className="my-8">Credits - {creator}</p>
          </a>
        </section>
      </main>
    </div>
  );
};

export default Song;
