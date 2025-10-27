import Menu from "@/components/layout/Menu";
import { MetaData } from "@/components/MetaData";
import Processor from "@/components/Processor";
import { fetchAlbumById, fetchArtistById, fetchArtists } from "@/lib/query/query";
import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";

export async function generateStaticParams() {
  const artists = await fetchArtists(); // Fetch all songs from your data source
  return artists.map(artist => {
    const slug = slugify(`${artist.title}`, { lower: true }) + '-' + artist.id.toString();
    // console.log(slug, ""); // Log the slug here
    return { slug };
  });
}

// export async function generateMetadata({ params }: any) {
//   const slugAndId = await params.slugAndId; // this is the [slugAndId] part
//   const id = slugAndId.split('-').pop(); // extract id from slug-id
//   const album = await fetchAlbumBySlug(id);
//   console.log(artist[0]);
//   const title = album && album[0]?.title
//   const keyword = ["Yeshu"]
//   const metaDescription = await artist[0]?.metaDescription
//   const slug = album && album[0]?.slug
//   console.log(slug);
//   const image = album && album[0]?.image

//   return await MetaData({ title, slug, image, keyword});
// }

const Page = async ({ params }: any) => {

  const slugAndId = params.slugAndId; // this is the [slugAndId] part
  const id = slugAndId.split('-').pop(); // extract id from slug-id

  // console.log(id, "albumData album page data");

  const albumData = await fetchAlbumById(id);
  const data = albumData ;
  const albumArtists = data?.artist[0].artist.title || [];
  // console.log(data, " album artists page data");
  const slug = data?.artist[0].artist.slug+ "-"+ data?.artist[0].artist.id;

// const color = albumData?.[0]?.color ?? "#121212"; 
  

  // console.log(color, "artist color page data");

  // if (!albumData || albumData.length === 0) {
  //   console.error(`No artist found for slug: ${artistSlug}`);
  //   return (
  //     <p className="text-foreground text-center">Name
  //       Sorry, no album was found for this ID.
  //     </p>
  //   );
  // }
  return (
    <>
      {/* hello {data.name} */}
      <div className="bg-background  rounded-lg ">
        <div className="flex gap-4 p-4 mb-4 flex-col text-white w-full"
        style={{
          // backgroundImage: `linear-gradient(to bottom, ${color}, transparent)`
        }}>
          <Menu />
          <div className=" flex items-center gap-4 w-full ">
            <div className="h-full w-3/12 md:w-2/12 sm:mb-0 mb-2 rounded-lg overflow-hidden  bg-card ">
              <Image
                src={data?.image || "https://drive.google.com/uc?export=view&id=19Vm_Qd_6F_ehN5SE2jkUYpnk7TMNwM1g"}
                alt={data?.title || "Artist Image"}
                width={150}
                height={100}
                className="bg-card object-cover h-full w-full"
                priority={true}
              />
            </div>
            <div className="sm:w-10/12 grid ">
              <h1 className="sm:text-4xl text-2xl font-semibold mb-1 text-foreground">
                {data?.title || "Artist"}
              </h1>
              <p className="text-sm  text-foreground">Album by  <Link href={`/artist/${slug}`}>{albumArtists}</Link> </p>
            </div>
          </div>
        </div>
        <h2 className="text-xl font-semibold m-4 text-foreground">Songs from {data?.title || "Artist"}</h2>
        <section className="w-full px-4">
          <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 ">
            {data?.song.map((item) => (
              <div key={item.songId}>
                <Processor item={item?.songId} type="album"/>
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
