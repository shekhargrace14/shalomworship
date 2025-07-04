import Menu from "@/components/layout/Menu";
import { MetaData } from "@/components/MetaData";
import Processor from "@/components/Processor";
import { fetchArtistById, fetchArtists } from "@/lib/query/query";
import Image from "next/image";
import slugify from "slugify";

export async function generateStaticParams() {
  const artists = await fetchArtists(); // Fetch all songs from your data source
  return artists.map(artist => {
    const slug = slugify(`${artist.name}`, { lower: true }) + '-' + artist.id.toString();
    // console.log(slug, ""); // Log the slug here
    return { slug };
  });
}

export async function generateMetadata({ params }: any) {
  const slugAndId = await params.slugAndId; // this is the [slugAndId] part
  const id = slugAndId.split('-').pop(); // extract id from slug-id
  const artist = await fetchArtistById(id);
  // console.log(artist[0]);
  const title = artist && artist[0]?.name
  const keyword = ["Yeshu"]
  // const metaDescription = await artist[0]?.metaDescription
  const slug = artist && artist[0]?.slug
  // console.log(slug);
  const image = artist && artist[0]?.image

  // return await MetaData({ title, slug, image, keyword, metaDescription });
}

const Page = async ({ params }: any) => {

  const slugAndId = params.slugAndId; // this is the [slugAndId] part
  const id = slugAndId.split('-').pop(); // extract id from slug-id

  // console.log(id, "artistData artist page data");

  const artistData = await fetchArtistById(id);
  const data = artistData && artistData[0];

  // console.log(data?.song, "artist song page data");
  // console.log(artistSlug, "artist page id");

  if (!artistData || artistData.length === 0) {
    // console.error(`No artist found for slug: ${artistSlug}`);
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
        <div className="p-4 pb-0 bg-[#1f1f1f]">
          <Menu />
        </div>
        <div className="md:flex gap-4 p-4 text-white w-full bg-gradient-to-b from-[#1f1f1f] to-[#000000]">
          <div className=" flex items-center gap-4 w-full ">
            <div className="h-full w-3/12 md:2/12 sm:mb-0 mb-2 rounded-lg overflow-hidden  bg-[#121212] ">
              <Image
                src={data?.image || "https://drive.google.com/uc?export=view&id=19Vm_Qd_6F_ehN5SE2jkUYpnk7TMNwM1g"}
                alt={data?.name || "Artist Image"}
                width={200}
                height={100}
                className="bg-gray-800 object-cover h-full w-full"
                priority={true}
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
