import { fetchArtistBySlug, fetchArtists, useGetArtistById } from "@/app/reactQuery/query";
import Processor from "@/components/Processor";
import Image from "next/image";

export async function generateStaticParams() {
  const artsits = await fetchArtists(); // Fetch all songs from your data source
  return artsits.map(artsit => ({
    id: artsit.id.toString(), // Convert to string if necessary
  }));
}

const Page = async ({ params }) => {
  const artistSlug = params.id;
  const artistData = await fetchArtistBySlug(artistSlug);
  const data = artistData[0];

  // console.log(artistData, "artistData artist page data");
  console.log(data?.song, "artist song page data");
  // console.log(artistSlug, "artist page id");

  if (!artistData || artistData.length === 0) {
    console.error(`No artist found for slug: ${artistSlug}`);
    return (
      <p className="text-white text-center">
        Sorry, no artist was found for this ID.
      </p>
    );
  }
  return (
    <>
      {/* hello {data.name} */}
      <div className="bg-[#000000]  rounded-lg h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="md:flex gap-4 p-4 text-white w-full bg-gradient-to-b from-[#1f1f1f] to-[#000000]">
          <div className=" flex items-center gap-4 w-full ">
            <div className="h-full w-3/12 md:2/12 sm:mb-0 mb-2 rounded-lg overflow-hidden  bg-[#121212] ">
              <Image
                src={data?.image || "/default-image.jpg"}
                alt={data?.title || "Song Image"}
                width={200}
                height={100}
                className="bg-gray-800 object-cover h-full w-full"
                priority={100}
              />
            </div>
            <div className="sm:w-10/12 grid">
              <h1 className="sm:text-4xl text-2xl font-semibold mb-1 text-white">
                {data?.name || "Artist"}
              </h1>
              <p className="text-sm  text-white">Artist</p>
            </div>
          </div>
        </div>
          <h2 className="text-xl font-semibold m-4 text-white">Songs from {data?.name || "Artist"}</h2>
        <section className="w-full">
          <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-0 ">
            {data?.song.map((item) => (
              <div key={item.songId}>
                <Processor item={item?.songId} />
              </div>
            ))}
          </div>
        </section>
        {/* <Processor params={data.song} /> */}
      </div>
    </>
  );
};

export default Page;
